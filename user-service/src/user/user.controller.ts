import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  BadRequestException,
  NotFoundException,
  Patch,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entities';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInfoResponseDto } from './dto/user-info-response.dto';
import { UserService } from './user.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/strategies/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
    isOnboardingCompleted: boolean;
  };
}

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registerUser(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<User> {
    const user = await this.userService.register(createUserDto, res);
    return user;
  }

  @Get('by-email/:email')
  async findByEmail(@Param('email') email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Kullanıcı bulunamadı');
    }

    return user;
  }

  @Get('user-info')
  @UseGuards(JwtAuthGuard)
  async getUserDashboardInfo(
    @Req() req: AuthenticatedRequest,
  ): Promise<UserInfoResponseDto> {
    const { userId } = req.user;
    return await this.userService.getUserInfo(userId);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateData: Partial<User>) {
    await this.userRepository.update(id, updateData);
    return { message: 'User updated' };
  }
  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }

    return user;
  }
}
