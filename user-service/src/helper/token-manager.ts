import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TokenManager {
  constructor(private readonly httpService: HttpService) {}

  async getAndSetTokens(
    res: Response,
    userPayload: {
      userId: string;
      email: string;
      isOnboardingCompleted: boolean;
    },
  ): Promise<void> {
    const tokenResponse = await firstValueFrom(
      this.httpService.post<{ accessToken: string; refreshToken: string }>(
        'http://auth-service:3001/auth/token-after-register',
        userPayload,
      ),
    );

    const { accessToken, refreshToken } = tokenResponse.data;

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
