import { Controller, Post, Body, Req } from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLoginDto } from 'dto/create-login.dto';
import { Request } from 'express';
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post('login')
  createLogin(@Body() createLoginDto: CreateLoginDto, @Req() req: Request) {
    const forwarded = req.headers['x-forwarded-for'];
    const ipAddress =
      typeof forwarded === 'string'
        ? forwarded.split(',')[0].trim()
        : req.socket?.remoteAddress || '';

    return this.logsService.createLoginLog(createLoginDto, ipAddress);
  }
  @Post('logout')
  logout(@Body() body: { userId: string; sessionId?: string }) {
    return this.logsService.updateLogoutLog(body.userId, body.sessionId);
  }
  @Post('expired')
  expired(@Body() body: { userId: string; sessionId?: string }) {
    return this.logsService.updateExpiredLog(body.userId, body.sessionId);
  }
}
