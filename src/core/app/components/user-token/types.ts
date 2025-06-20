import { UserId } from '../../../domain/components/user/types';
import { BaseTokenPayload, BaseTokenWithIdPayload } from '../../common/ports/jwt.service.port';

export type AccessTokenPayload = BaseTokenPayload;

export type RefreshTokenPayload = BaseTokenWithIdPayload;

export type CreateAccessTokenPayload = {
  userId: UserId;
};

export type CreateRefreshTokenPayload = CreateAccessTokenPayload & {
  ip: string;
  userAgent: string;
};
