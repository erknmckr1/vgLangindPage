import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { LoginLog } from 'src/entities/login-log-entity';
@Module({
  imports: [TypeOrmModule.forFeature([LoginLog])],
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}
