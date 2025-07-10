import { UserId } from '@core/domain/components/user/types';
import { BaseTokenPayload, BaseTokenWithIdPayload } from '@core/app/common/ports/jwt.service.port';

export type AccessTokenPayload = BaseTokenPayload;

export type RefreshTokenPayload = BaseTokenWithIdPayload;

export type CreateAccessTokenPayload = {
  userId: UserId;
};

export type CreateRefreshTokenPayload = CreateAccessTokenPayload & {
  ip: string;
  userAgent: string;
};
