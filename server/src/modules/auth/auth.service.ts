import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly JWT_SECRET = process.env.JWT_SECRET;
  private readonly REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
  private readonly JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN;
  private readonly JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN;

  async generateTokens(payload: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.JWT_SECRET,
        expiresIn: this.JWT_ACCESS_EXPIRES_IN,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.REFRESH_TOKEN_SECRET,
        expiresIn: this.JWT_REFRESH_EXPIRES_IN,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async signup(dto: SignupDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    return this.userService.createUser({ ...dto, password: hash });
  }

  async login(dto: LoginDto, res: Response) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id, role: user.role };
    const { accessToken, refreshToken } = await this.generateTokens(payload);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // use true in production (HTTPS)
      sameSite: 'lax',
      maxAge: 1000 * 60 * 15, // 15 mins - use this
      path: '/',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return {
      // accessToken, refreshToken, user
      message: 'Logged In successfully',
    };
  }

  async refreshAccessToken(token: string, res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.REFRESH_TOKEN_SECRET,
      });

      const refreshPayload = { sub: payload.sub, role: payload.role };

      const { accessToken, refreshToken } =
        await this.generateTokens(refreshPayload);

      const user = await this.userService.findById(payload.sub);

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // use true in production (HTTPS)
        sameSite: 'lax',
        maxAge: 1000 * 60 * 15, // 15 mins - use this
        path: '/',
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return {
        // accessToken, refreshToken, user
        message: 'Tokens generated successfully',
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
