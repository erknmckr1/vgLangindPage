// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db', // docker-compose.yml içinde PostgreSQL servisi "db" olarak tanımlı olmalı
      port: 5432,
      username: 'postgres',
      password: 'Erkan3402.',
      database: 'auth_db',
      entities: [], // Entity dosyasını doğrudan burada gösteriyoruz
      synchronize: true, // İlk testler için true. Prod'da false olacak.
    }),
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // Her yerden erişilebilsin diye
      envFilePath: '.env', // Eğer `.env.development` kullandıysan buraya onu yaz
    }),
  ],
})
export class AppModule {}
