import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreProfile } from 'src/user/entities/store-profile.entities';
import { User } from 'src/user/entities/user.entities';
import { BillingInfo } from 'src/user/entities/billing-info.entity';
import { Theme } from 'src/user/entities/theme.entity';
import { ProductType } from 'src/user/entities/product-type.entity';
import { OnboardinCompleteDto } from './dto/complete-onboarding.dto';
import { Response } from 'express';
import { TokenManager } from 'src/helper/token-manager';
@Injectable()
export class OnboardingService {
  constructor(
    @InjectRepository(StoreProfile)
    private storeProfileRepo: Repository<StoreProfile>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(BillingInfo)
    private billingRepo: Repository<BillingInfo>,
    @InjectRepository(ProductType)
    private productTypeRepo: Repository<ProductType>,
    @InjectRepository(Theme)
    private themeRepo: Repository<Theme>,
    private readonly tokenManager: TokenManager,
  ) {}

  async completeOnboarding(
    dto: OnboardinCompleteDto,
    userId: string,
    res: Response,
  ) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error('Kullanıcı bulunamadı.');

    // 1. Store Profile oluştur
    const store = this.storeProfileRepo.create({
      slogan: dto.slogan,
      category: dto.category,
      logo: dto.logo,
      bio: dto.bio,
      user,
    });
    await this.storeProfileRepo.save(store);

    // 2. Billing Info oluştur
    const billing = this.billingRepo.create({
      iban: dto.iban,
      bankName: dto.bankName,
      taxId: dto.taxId,
      invoiceTitle: dto.invoiceTitle,
      user,
    });
    await this.billingRepo.save(billing);

    // 3. Product Type'ları kaydet
    if (dto.productTypes?.length) {
      for (const type of dto.productTypes) {
        const pt = this.productTypeRepo.create({
          name: type,
          user,
        });
        await this.productTypeRepo.save(pt);
      }
    }

    // 4. Theme oluştur
    const theme = this.themeRepo.create({
      name: dto.theme,
      user,
    });
    await this.themeRepo.save(theme);

    // 5. User güncelle
    user.accountType = dto.accountType as 'individual' | 'corporate';
    user.profileType = dto.profileType as 'product' | 'service';
    user.isOnboardingCompleted = true;
    user.onboardingStatus = 'completed';
    await this.userRepo.save(user);

    await this.tokenManager.getAndSetTokens(res, {
      userId: user.id,
      email: user.email,
      isOnboardingCompleted: user.isOnboardingCompleted,
    });
  }
}
