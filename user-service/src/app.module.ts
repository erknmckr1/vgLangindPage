// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entities';
import { StoreProfile } from './user/entities/store-profile.entities';
import { ProductType } from './user/entities/product-type.entity';
import { Theme } from './user/entities/theme.entity';
import { BillingInfo } from './user/entities/billing-info.entity';
import { OnboardingModule } from './onboarding/onboarding.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { ThemeModule } from './user/user-theme/theme.module';
import { StoreProfileModule } from './user/store-profile/store-profile.module';
import { BillingInfoModule } from './user/billing-info/billing-info.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db', // docker-compose içindeki container adı
      port: 5432,
      username: 'postgres',
      password: 'Erkan3402.',
      database: 'user_service_db',
      autoLoadEntities: false,
      synchronize: true, // dev ortamında true olabilir
      entities: [User, StoreProfile, ProductType, Theme, BillingInfo],
    }),
    UserModule,
    OnboardingModule,
    BillingInfoModule,
    StoreProfileModule,
    ThemeModule,
  ],
  providers: [JwtStrategy, JwtAuthGuard],
})
export class AppModule {}
