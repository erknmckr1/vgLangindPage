import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/strategies/jwt-auth.guard';
import { StoreProfileService } from './store-profile.service';
import { StoreProfileResponseDto } from './dto/store-profile-response.dto';
import { AuthenticatedRequest } from 'src/common/types/authenticate-types';

@Controller('store-profile')
export class StoreProfileController {
  constructor(private readonly storeProfileService: StoreProfileService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getStoreProfile(
    @Req() req: AuthenticatedRequest,
  ): Promise<StoreProfileResponseDto> {
    console.log(req.user);
    const { userId } = req.user;
    return this.storeProfileService.getStoreProfile(userId);
  }
}
