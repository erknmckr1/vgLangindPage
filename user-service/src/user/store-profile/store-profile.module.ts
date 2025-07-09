import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreProfileController } from './store-profile.controller';
import { StoreProfileService } from './store-profile.service';
import { StoreProfile } from '../entities/store-profile.entities';

@Module({
  imports: [TypeOrmModule.forFeature([StoreProfile])],
  controllers: [StoreProfileController],
  providers: [StoreProfileService],
  exports: [StoreProfileService], // İleride başka modüller kullanacaksa
})
export class StoreProfileModule {}
