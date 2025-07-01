import { ExtractJwt, Strategy } from 'passport-jwt';
import * as process from 'process';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { AccessTokenPayload } from '@core/app/components/admin-token/types';
import { ACCESS_TOKEN_STRATEGY_NAME } from './constants';
import { ACCESS_TOKEN_COOKIE_NAME } from '../constants';

function cookieExtractor({ cookies }: Request): string | null {
  return (cookies[ACCESS_TOKEN_COOKIE_NAME] as string) || null;
}

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, ACCESS_TOKEN_STRATEGY_NAME) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET || 'accessSecret',
    });
  }

  validate(payload: AccessTokenPayload) {
    return payload;
  }
}
