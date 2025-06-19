import { ExtractJwt, Strategy } from 'passport-jwt';
import * as process from 'process';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { REFRESH_TOKEN_COOKIE_NAME } from '../constants';
import { REFRESH_TOKEN_STRATEGY_NAME } from './constants';
import { RefreshTokenPayload } from '../../../../core/app/components/admin-token/types';

function cookieExtractor({ cookies }: Request): string | null {
  return (cookies[REFRESH_TOKEN_COOKIE_NAME] as string) || null;
}

@Injectable()
export default class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  REFRESH_TOKEN_STRATEGY_NAME,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: process.env.REFRESH_TOKEN_SECRET || 'refreshSecret',
    });
  }

  validate(payload: RefreshTokenPayload) {
    return payload;
  }
}
