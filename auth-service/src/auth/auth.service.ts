import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import sendLogoutLog from './helper/log.helper';
import { RemoteUser } from './interfaces/user.interface';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, // Nest'in sağladığı JwtService, JWT token oluşturmak ve doğrulamak için kullanılır.
    private readonly httpService: HttpService,
  ) {}

  async loginUser(
    loginDto: LoginUserDto,
  ): Promise<{ accessToken: string; refreshToken: string; userId: string }> {
    const { email, password } = loginDto;
    // 1. user-service'ten kullanıcıyı al
    let user: RemoteUser;
    try {
      const response = await firstValueFrom(
        this.httpService.get<RemoteUser>(
          `http://user-service:3003/users/by-email/${email}`,
        ),
      );
      user = response.data;
    } catch (error: unknown) {
      console.log(error);
      throw new UnauthorizedException({
        field: 'email',
        message: 'Girdiğiniz email ile kullanıcı kaydı yok.',
      });
    }

    // 2. Şifreyi kontrol et
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException({
        field: 'password',
        message: 'Hatalı şifre',
      });
    }

    const payload = {
      sub: user.id,
      email: user.email,
      isOnboardingCompleted: user.isOnboardingCompleted,
    };
    // 3. Access token
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    // 4. Refresh token
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    // 5. refreshToken'ı user-service'e kaydet (PATCH veya PUT isteği)
    try {
      await firstValueFrom(
        this.httpService.patch(`http://user-service:3003/users/${user.id}`, {
          refreshToken: hashedRefreshToken,
        }),
      );
    } catch (error) {
      console.error('refreshToken güncellenemedi:', error);
    }

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
      const response = await firstValueFrom(
        this.httpService.get<RemoteUser>(
          `http://user-service:3003/users/${payload.sub}`,
        ),
      );
      console.log(response.data);
      const user = response.data;
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
      await firstValueFrom(
        this.httpService.patch(`http://user-service:3003/users/${user.id}`, {
          refreshToken: hashedNewRefreshToken,
        }),
      );

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
    try {
      // 1. Kullanıcıyı user-service üzerinden getir
      const response = await firstValueFrom(
        this.httpService.get<RemoteUser>(
          `http://user-service:3003/users/${userId}`,
        ),
      );

      const user = response.data;

      if (!user) {
        throw new NotFoundException('Kullanıcı bulunamadı.');
      }

      if (!user.refreshToken) {
        throw new BadRequestException('Aktif oturum bulunamadı.');
      }

      // 2. Refresh token eşleşmesini kontrol et
      const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!isMatch) {
        throw new UnauthorizedException('Refresh token uyuşmuyor.');
      }

      // 3. Refresh token'ı silmek için user-service'e PATCH isteği gönder
      await firstValueFrom(
        this.httpService.patch(`http://user-service:3003/users/${userId}`, {
          refreshToken: null,
        }),
      );

      // 4. Logout logunu gönder (opsiyonel hata toleransı)
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
    } catch (err) {
      console.error('Logout hatası:', err);
      throw new UnauthorizedException('Çıkış yapılamadı.');
    }
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  // Bu sadece token ve DB işlemi yapar, cookie işlemez!
  async generateTokens({
    email,
    userId,
    isOnboardingCompleted,
  }: {
    email: string;
    userId: string;
    isOnboardingCompleted: boolean;
  }): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: userId, email, isOnboardingCompleted };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await firstValueFrom(
      this.httpService.patch(`http://user-service:3003/users/${userId}`, {
        refreshToken: hashedRefreshToken,
      }),
    );
    return { accessToken, refreshToken };
  }
}
