import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UseGuards,
  Get,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { ClientAuthService } from './client-auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { Request, Response } from 'express';

@Controller('client-auth')
export class ClientAuthController {
  constructor(private readonly authService: ClientAuthService) {}

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

    res.cookie('client_refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/api/client-auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { accessToken };
  }

  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = req.cookies?.client_refresh_token;

    if (!token) throw new ForbiddenException('Refresh token missing');

    const { accessToken, refreshToken } =
      await this.authService.refreshAccessToken(token);

    res.cookie('client_refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/api/client-auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies?.client_refresh_token;
    if (token) {
      await this.authService.logout();
    }

    res.clearCookie('client_refresh_token', {
      path: '/api/client-auth/refresh',
    });
    return { message: 'Logged out' };
  }
}
