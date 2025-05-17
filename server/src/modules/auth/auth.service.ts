import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id, role: user.role };
    const tokens = await this.generateTokens(payload);

    await this.saveRefreshToken(user._id.toString(), tokens.refreshToken);

    return tokens;
  }

  async refreshAccessToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.REFRESH_TOKEN_SECRET,
      });

      const user = await this.userService.findById(payload.sub);

      if (!user || !user.refreshToken)
        throw new ForbiddenException('Access Denied');

      const isMatch = await bcrypt.compare(token, user.refreshToken);
      if (!isMatch) throw new ForbiddenException('Refresh token mismatch');

      const refreshPayload = { sub: payload.sub, role: payload.role };

      const tokens = await this.generateTokens(refreshPayload);

      await this.saveRefreshToken(user._id.toString(), tokens.refreshToken);

      return tokens;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout() {
    await this.userService.userLogout();
  }

  private async saveRefreshToken(userId: string, token: string) {
    const hashed = await bcrypt.hash(token, 10);
    await this.userService.findByIdAndUpdate(userId, hashed);
  }
}
