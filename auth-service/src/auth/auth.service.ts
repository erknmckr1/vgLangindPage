import {
  Injectable,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entities';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import sendLogoutLog from './helper/log.helper';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService, // Nest'in sağladığı JwtService, JWT token oluşturmak ve doğrulamak için kullanılır.
    private readonly httpService: HttpService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const { email, password, name, phone, storeName } = createUserDto;

    if (!email || !password || !name || !phone) {
      throw new BadRequestException('email-password-name-phone');
    }

    // 1. Email kontrolü
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Bu email adresi zaten kullanılıyor');
    }

    // 2. Şifre hashleme
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Yeni kullanıcı oluştur
    const user = this.userRepository.create({
      name,
      phone,
      storeName,
      email,
      password: hashedPassword,
    });

    // 4. Veritabanına kaydet
    const savedUser = await this.userRepository.save(user);

    // 5. Şifreyi dönme
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = savedUser;
    return result;
  }
  // Kullanıcı giriş yapacağı zaman kullanııcı adı ve şifre tanımlı kontrol edip token dönecek servis
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    // Şifreyi çıkartıyoruz, token içine girmesin
    return user;
  }

  async loginUser(
    loginDto: LoginUserDto,
  ): Promise<{ accessToken: string; refreshToken: string; userId: string }> {
    const { email, password } = loginDto;

    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Email veya şifre hatalı.');
    }

    const payload = { sub: user.id, email: user.email };

    // 1. Access token
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    // 2. Refresh token
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    // 3. DB'ye refreshToken'ı kaydet
    await this.usersService.update(user.id, {
      refreshToken: hashedRefreshToken,
    });

    return { accessToken, refreshToken, userId: user.id };
  }

  async refreshTokens(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      // 1. Refresh token'ı decode et ve payload çıkar
      const payload = this.jwtService.verify<{ sub: string; email: string }>(
        refreshToken,
        { secret: process.env.JWT_REFRESH_SECRET },
      );

      // 2. Veritabanından kullanıcıyı bul
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Refresh token bulunamadı.');
      }

      // 3. Gelen refresh token, DB'deki hash ile eşleşiyor mu kontrol et
      const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!isMatch) {
        throw new UnauthorizedException('Refresh token geçersiz.');
      }

      // 4. Yeni token'ları oluştur
      const newPayload = { sub: user.id, email: user.email };

      const accessToken = this.jwtService.sign(newPayload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      });

      const newRefreshToken = this.jwtService.sign(newPayload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      });

      // 5. Yeni refresh token’ı hashleyerek veritabanına kaydet
      const hashedNewRefreshToken = await bcrypt.hash(newRefreshToken, 10);
      user.refreshToken = hashedNewRefreshToken;
      await this.userRepository.save(user);

      await sendLogoutLog({
        httpService: this.httpService,
        userId: payload.sub,
      });

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Token doğrulama başarısız.');
    }
  }

  async logout(userId: string, refreshToken: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı.');
    }

    if (!user.refreshToken) {
      throw new BadRequestException('Aktif oturum bulunamadı.');
    }

    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!isMatch) {
      throw new UnauthorizedException('Refresh token uyuşmuyor.');
    }

    await this.usersService.update(userId, { refreshToken: null });

    // log servisine logout gönder

    try {
      await firstValueFrom(
        this.httpService.post(
          `${process.env.LOG_API}/logs/logout`,
          { userId, logoutAt: new Date() },
          { timeout: 3000 },
        ),
      );
    } catch (err) {
      console.error('Logout log gönderilemedi:', err);
    }
  }
}
