import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';
import { OnboardinCompleteDto } from './dto/complete-onboarding.dto';
import { JwtAuthGuard } from 'src/strategies/jwt-auth.guard';
import { Request, Response } from 'express';
import { OnboardingService } from './onboarding.service';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post('complete')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async onboardingCompleted(
    @Body() dto: OnboardinCompleteDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user as { userId: string };

    await this.onboardingService.completeOnboarding(dto, user.userId, res);

    res.status(200).json({ message: 'Onboarding başarıyla tamamlandı.' });
  }
}
