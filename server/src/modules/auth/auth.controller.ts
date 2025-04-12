import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt.guard';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.login(dto);
    // res.cookie('refresh_token', tokens.refresh_token, {
    //   httpOnly: true,
    //   sameSite: 'strict',
    //   secure: true, // 👉 Only send over HTTPS
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 👉 7 days in milliseconds
    // });

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: false, // use true in production (HTTPS)
      sameSite: 'lax',
      // maxAge: 1000 * 60 * 15, // 15 mins - use this
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return tokens;
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }

  // @Post('refresh')
  // async refresh(@Req() req: Request) {
  //   const refreshToken = req.cookies?.refresh_token;
  //   return this.authService.refreshAccessToken(refreshToken);
  // }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken');
    return { message: 'Logged out' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: Request) {
    return req['user'];
  }
}
