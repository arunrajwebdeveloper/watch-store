import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    return this.userService.createUser({ ...dto, password: hash });
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    return { accessToken, refreshToken, user };
  }

  // refreshToken in Body

  // async refreshAccessToken(token: string) {
  // try {
  //   const payload = await this.jwtService.verifyAsync(token, {
  //     secret: process.env.REFRESH_TOKEN_SECRET,
  //   });
  //   const newToken = await this.jwtService.signAsync(
  //     { sub: payload.sub, role: payload.role },
  //     {
  //       secret: process.env.JWT_SECRET,
  //       expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  //     },
  //   );
  //   return { accessToken: newToken };
  // } catch {
  //   throw new UnauthorizedException('Invalid refresh token');
  // }
  // }

  async refreshAccessToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });

      const accessToken = await this.jwtService.signAsync(
        { sub: payload.sub, role: payload.role },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        },
      );

      const refreshToken = await this.jwtService.signAsync(
        { sub: payload.sub, role: payload.role },
        {
          secret: process.env.REFRESH_TOKEN_SECRET,
          expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        },
      );

      const user = await this.userService.findById(payload.sub);

      return { accessToken, refreshToken, user };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
