import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACCESS_TOKEN_STRATEGY_NAME } from '../strategies/constants';
import { UnauthorizedException } from '../../../../core/shared/exceptions';
import { ACCESS_TOKEN_COOKIE_NAME } from '../constants';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';
import { AccessTokenPayload } from '../../../../core/app/components/admin-token/types';
import type { Response } from 'express';
import type { ExecutionContext } from '@nestjs/common';

@Injectable()
export class AccessTokenGuard extends AuthGuard(ACCESS_TOKEN_STRATEGY_NAME) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  // @ts-expect-error fix error
  handleRequest(
    err: any,
    tokenPayload: AccessTokenPayload | false,
    info: any,
    context: ExecutionContext,
  ) {
    const res: Response = context.switchToHttp().getResponse();

    if (!tokenPayload) {
      res.clearCookie(ACCESS_TOKEN_COOKIE_NAME);

      throw new UnauthorizedException('Access token is invalid.');
    }

    return tokenPayload;
  }
}
