import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { Response, Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';
interface CustomRequest extends Request {
  cookies: {
    refresh_token?: string;
  };
  user: {
    userId: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() createUserDto: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = await this.authService.register(createUserDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Kullanıcı başarıyla oluşturuldu',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: user,
    };
  }
  @Post('login') // ⇒ Bu bir route decorator’ü. Aynı Express’teki app.post('/login') gibi çalışır.
  @HttpCode(200) // ⇒ HTTP yanıt kodunu override ediyor. Normalde 201 dönerdi.
  async login(
    @Body() loginUserDto: LoginUserDto, // ⇒ req.body
    @Res({ passthrough: true }) res: Response, // ⇒ res objesi
  ) {
    const { accessToken, refreshToken } =
      await this.authService.loginUser(loginUserDto);

    // Cookie'lere token'ları ekleyelim
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1 * 60 * 1000,
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 gün
    });
    return {
      statusCode: 200,
      message: 'Giriş Başarılı',
    };
  }

  @Post('refresh-token')
  @HttpCode(200)
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refresh_token } = req.cookies as { refresh_token?: string };

    if (!refresh_token) {
      throw new UnauthorizedException('Refresh token bulunamadı.');
    }

    const tokens = await this.authService.refreshTokens(refresh_token);

    // Yeni token’ları cookie’ye yaz
    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { message: 'Token yenilendi' };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async logout(
    @Req() req: CustomRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user as { userId: string };
    const { refresh_token } = req.cookies ?? {};
    if (!refresh_token) {
      throw new BadRequestException('Refresh token eksik.');
    }

    await this.authService.logout(user.userId, refresh_token);

    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    // 3. Cevap dön
    return { message: 'Çıkış başarılı.' };
  }
  @Get('test')
  getTest() {
    return { message: 'cors test passed' };
  }
}
