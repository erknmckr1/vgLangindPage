import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

interface JwtRequest extends Request {
  cookies: {
    access_token?: string;
  };
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(), // ✅ Bearer desteği ekle
        (req: JwtRequest): string | null => {
          return req.cookies?.access_token ?? null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('JWT_ACCESS_SECRET') || 'default_secret',
    });
  }

  validate(payload: {
    sub: string;
    email: string;
    isOnboardingCompleted: boolean;
  }) {
    return {
      userId: payload.sub,
      email: payload.email,
      isOnboardingCompleted: payload.isOnboardingCompleted,
    };
  }
}
