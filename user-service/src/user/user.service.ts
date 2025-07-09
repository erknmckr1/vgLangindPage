import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entities';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs';
import { Response } from 'express';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly httpService: HttpService,
  ) {}

  async register(createUserDto: CreateUserDto, res: Response): Promise<User> {
    const { password, ...rest } = createUserDto;

    const existing = await this.userRepository.findOne({
      where: [
        { email: createUserDto.email },
        { phone: createUserDto.phone },
        { storeName: createUserDto.storeName },
      ],
    });

    if (existing) {
      throw new BadRequestException(
        'Bu e-posta, telefon veya mağaza adı zaten kullanılıyor.',
      );
    }

    let hashedPassword: string;

    try {
      const response = await firstValueFrom(
        this.httpService.post('http://auth-service:3001/auth/hash-password', {
          password,
        }) as Observable<{ data: { hashedPassword: string } }>,
      );

      hashedPassword = response.data.hashedPassword;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Şifre hashleme hatası:', error.message);
      } else {
        console.error('Bilinmeyen hata oluştu:', error);
      }

      throw new BadRequestException(
        'Parola işlenemedi, lütfen tekrar deneyin.',
      );
    }

    const user = this.userRepository.create({
      ...rest,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    const tokenResponse = await firstValueFrom(
      this.httpService.post<{ accessToken: string; refreshToken: string }>(
        'http://auth-service:3001/auth/token-after-register',
        {
          userId: savedUser.id,
          email: savedUser.email,
          isOnboardingCompleted: user.isOnboardingCompleted,
        },
      ),
    );

    const { accessToken, refreshToken } = tokenResponse.data;

    // ✅ Cookie olarak token'ları gönder
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15 dakika
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 gün
    });

    return savedUser;
  }

  async getUserInfo(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        storeName: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return {
      id: user?.id,
      email: user?.email,
      name: user?.name,
      phone: user?.phone,
      storeName: user.storeName,
    };
  }
}
