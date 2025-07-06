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
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entities';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Response } from 'express';
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

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }

    return user;
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateData: Partial<User>) {
    await this.userRepository.update(id, updateData);
    return { message: 'User updated' };
  }
}
