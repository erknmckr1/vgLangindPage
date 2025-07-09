import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreProfile } from '../entities/store-profile.entities';
import { StoreProfileResponseDto } from './dto/store-profile-response.dto';

@Injectable()
export class StoreProfileService {
  constructor(
    @InjectRepository(StoreProfile)
    private readonly storeProfileRepo: Repository<StoreProfile>,
  ) {}

  async getStoreProfile(userId: string): Promise<StoreProfileResponseDto> {
    const storeProfile = await this.storeProfileRepo.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'],
    });

    if (!storeProfile) {
      throw new NotFoundException('Store profile not found');
    }

    return {
      slogan: storeProfile.slogan,
      category: storeProfile.category,
      bio: storeProfile.bio,
      logo: storeProfile.logo,
    };
  }
}
