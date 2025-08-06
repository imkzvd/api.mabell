import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { AccessTokenPayload } from '@core/app/components/admin-token/types';
import { ACCESS_TOKEN_STRATEGY_NAME } from './constants';
import { ACCESS_TOKEN_COOKIE_NAME } from '../constants';

function cookieExtractor({ cookies }: Request): string | null {
  return (cookies[ACCESS_TOKEN_COOKIE_NAME] as string) || null;
}

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, ACCESS_TOKEN_STRATEGY_NAME) {
  constructor(private readonly _configService: ConfigService) {
    const accessTokenSecret = _configService.get<string>('jwt.accessToken.secret');

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: accessTokenSecret || 'accessSecret',
    });
  }

  validate(payload: AccessTokenPayload) {
    return payload;
  }
}
