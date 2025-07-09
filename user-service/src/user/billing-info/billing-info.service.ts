import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillingInfo } from '../entities/billing-info.entity';
import { Repository } from 'typeorm';
import { CreateBillingDto, UpdateBillingDto } from './billing-info.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class BillingInfoService {
  constructor(
    @InjectRepository(BillingInfo)
    private readonly billingRepo: Repository<BillingInfo>,
  ) {}

  async getUserBillingAccounts(userId: string) {
    return await this.billingRepo.find({
      where: { user: { id: userId } },
      order: { isPrimary: 'DESC' },
    });
  }

  async create(userId: string, dto: CreateBillingDto) {
    const billing = this.billingRepo.create({
      ...dto,
      user: { id: userId },
    });

    return await this.billingRepo.save(billing);
  }

  async update(id: string, dto: UpdateBillingDto) {
    await this.billingRepo.update(id, dto);
    return { success: true };
  }

  async remove(id: string) {
    await this.billingRepo.delete(id);
    return { success: true };
  }

  async setPrimary(id: string) {
    const billing = await this.billingRepo.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!billing) throw new NotFoundException('Kayıt bulunamadı.');

    const userId = billing.user.id;

    // Önce tüm diğer kayıtları isPrimary: false yap
    await this.billingRepo.update(
      { user: { id: userId } },
      { isPrimary: false },
    );

    // Sonra bu kaydı isPrimary: true yap
    await this.billingRepo.update(id, { isPrimary: true });

    return { success: true };
  }
}
