import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/strategies/jwt-auth.guard';
import { ThemeService } from './theme.service';
import { ThemeResponseDto } from './dto/theme-response.dto';
import { AuthenticatedRequest } from 'src/common/types/authenticate-types';

@Controller('theme')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getTheme(@Req() req: AuthenticatedRequest): Promise<ThemeResponseDto> {
    const { userId } = req.user;
    return this.themeService.getThemeByUserId(userId);
  }
}
