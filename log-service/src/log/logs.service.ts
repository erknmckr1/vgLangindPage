import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginLog } from 'src/entities/login-log-entity';
import { IsNull } from 'typeorm';
@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(LoginLog)
    private loginLogRepo: Repository<LoginLog>,
  ) {}

  async createLoginLog(
    data: Partial<LoginLog>,
    ipAddress: string,
  ): Promise<LoginLog> {
    // 1. Logout edilmemiş en son login kaydını bul
    const lastLogin = await this.loginLogRepo.findOne({
      where: {
        userId: data.userId,
        logoutAt: IsNull(),
      },
      order: { loginAt: 'DESC' },
    });

    // 2. Varsa, onu kapat (logoutAt alanını doldur)
    if (lastLogin) {
      lastLogin.logoutAt = new Date();
      lastLogin.status = 'EXPIRED';
      await this.loginLogRepo.save(lastLogin);
    }

    const newLog = this.loginLogRepo.create({
      ...data,
      loginAt: new Date(),
      status: 'LOGIN',
      ipAddress,
    });
    return this.loginLogRepo.save(newLog);
  }

  async updateLogoutLog(
    userId: string,
    sessionId?: string,
  ): Promise<LoginLog | null> {
    const latestLogin = await this.loginLogRepo.findOne({
      where: {
        userId,
        ...(sessionId && { sessionId }),
        status: 'LOGIN',
      },
      order: { loginAt: 'DESC' },
    });

    if (!latestLogin) {
      console.warn(`Logout log kaydı bulunamadı: ${userId}`);
      return null;
    }

    latestLogin.logoutAt = new Date();
    latestLogin.status = 'LOGOUT';

    return this.loginLogRepo.save(latestLogin);
  }

  async updateExpiredLog(
    userId: string,
    sessionId?: string,
  ): Promise<LoginLog | null> {
    const latestLogin = await this.loginLogRepo.findOne({
      where: {
        userId,
        ...(sessionId && { sessionId }),
        status: 'LOGIN',
      },
      order: { loginAt: 'DESC' },
    });

    if (!latestLogin) {
      console.warn(`Login log kaydı bulunamadı: ${userId}`);
      return null;
    }

    latestLogin.logoutAt = new Date();
    latestLogin.status = 'EXPIRED';
    return this.loginLogRepo.save(latestLogin);
  }
}
