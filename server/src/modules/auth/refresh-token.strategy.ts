import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload } from './types/jwt-payload.interface';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.['refresh_token']; // or 'refreshToken' depending on how you store it
        },
      ]),
      secretOrKey: process.env.REFRESH_TOKEN_SECRET!, // ✅ fix applied
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
