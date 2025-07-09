import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingInfoService } from './billing-info.service';
import { BillingInfo } from '../entities/billing-info.entity';
import { BillingInfoController } from './billing-info.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BillingInfo])],
  providers: [BillingInfoService],
  controllers: [BillingInfoController],
  exports: [BillingInfoService],
})
export class BillingInfoModule {}
