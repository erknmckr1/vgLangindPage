// main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // extra alanları siler
      forbidNonWhitelisted: true, // DTO'da tanımsız alanlar varsa hata verir
      transform: true, // gelen payload'ı DTO'ya dönüştürür
      enableDebugMessages: true,
      disableErrorMessages: false,
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(3003);
}
void bootstrap();
