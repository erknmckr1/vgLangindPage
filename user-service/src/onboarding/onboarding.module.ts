import { Module } from '@nestjs/common';
import { OnboardingController } from './onboarding.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/strategies/jwt-auth.guard';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { BillingInfo } from 'src/user/entities/billing-info.entity';
import { User } from 'src/user/entities/user.entities';
import { ProductType } from 'src/user/entities/product-type.entity';
import { Theme } from 'src/user/entities/theme.entity';
import { StoreProfile } from 'src/user/entities/store-profile.entities';
import { OnboardingService } from './onboarding.service';
import { TokenManager } from 'src/helper/token-manager';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      StoreProfile,
      Theme,
      ProductType,
      User,
      BillingInfo,
    ]),
    HttpModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_ACCESS_SECRET');
        return {
          secret,
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
  ],
  controllers: [OnboardingController],
  providers: [JwtStrategy, JwtAuthGuard, OnboardingService, TokenManager],
  exports: [OnboardingService, TokenManager],
})
export class OnboardingModule {}
