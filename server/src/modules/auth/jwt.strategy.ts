import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { Request } from 'express';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // if using Bearer token
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // if using cookies
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.['accessToken'];
        },
      ]),

      // jwtFromRequest: ExtractJwt.fromExtractors([
      //   (req: Request) => {
      //     const source = req.headers['source'];
      //     if (source === 'admin') {
      //       const authHeader = req.headers['authorization'];
      //       if (authHeader?.startsWith('Bearer ')) {
      //         return authHeader.split(' ')[1];
      //       }
      //     } else {
      //       return req.cookies?.['accessToken'];
      //     }
      //     return null;
      //   },
      // ]),
      ignoreExpiration: false, // Not for Bearer token
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, role: payload.role };
  }
}
