import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BillingInfoService } from './billing-info.service';
import { CreateBillingDto, UpdateBillingDto } from './billing-info.dto';
import { JwtAuthGuard } from 'src/strategies/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/common/types/authenticate-types';

@Controller('billing-info')
@UseGuards(JwtAuthGuard)
export class BillingInfoController {
  constructor(private readonly billingService: BillingInfoService) {}

  @Get()
  async getUserBillingInfo(@Req() req: AuthenticatedRequest) {
    const { userId } = req.user;
    return await this.billingService.getUserBillingAccounts(userId);
  }

  @Post()
  async createBillingInfo(
    @Req() req: AuthenticatedRequest,
    @Body() body: CreateBillingDto,
  ) {
    const { userId } = req.user;
    return await this.billingService.create(userId, body);
  }

  @Patch(':id')
  async updateBillingInfo(
    @Param('id') id: string,
    @Body() body: UpdateBillingDto,
  ) {
    return await this.billingService.update(id, body);
  }

  @Delete(':id')
  async deleteBillingInfo(@Param('id') id: string) {
    return await this.billingService.remove(id);
  }

  @Patch('set-primary/:id')
  async setPrimaryBilling(@Param('id') id: string) {
    return await this.billingService.setPrimary(id);
  }
}
