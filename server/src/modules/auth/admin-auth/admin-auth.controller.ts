import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  Get,
  ForbiddenException,
} from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly authService: AdminAuthService) {}

  @Post('register')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(dto);

    res.cookie('admin_refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/api/admin-auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { accessToken };
  }

  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = req.cookies?.admin_refresh_token;

    if (!token) throw new ForbiddenException('Refresh token missing');

    const { accessToken, refreshToken } =
      await this.authService.refreshAccessToken(token);

    res.cookie('admin_refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/api/admin-auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies?.admin_refresh_token;
    if (token) {
      await this.authService.logout();
    }

    res.clearCookie('admin_refresh_token', { path: '/api/admin-auth/refresh' });
    return { message: 'Logged out' };
  }
}
