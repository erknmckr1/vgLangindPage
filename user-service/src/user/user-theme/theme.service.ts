import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theme } from 'src/user/entities/theme.entity';
import { ThemeResponseDto } from './dto/theme-response.dto';

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(Theme)
    private readonly themeRepo: Repository<Theme>,
  ) {}

  async getThemeByUserId(userId: string): Promise<ThemeResponseDto> {
    const theme = await this.themeRepo.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'],
    });

    if (!theme) {
      throw new NotFoundException('Theme not found');
    }

    return {
      id: theme.id,
      name: theme.name,
      previewImage: theme.previewImage ?? null,
    };
  }
}
