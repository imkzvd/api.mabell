import { BaseTokenPayload, BaseTokenWithIdPayload } from '../../ports/jwt/types';
import { UserId } from '../../../domain/components/user/types';

export type AccessTokenPayload = BaseTokenPayload;

export type RefreshTokenPayload = BaseTokenWithIdPayload;

export type CreateAccessTokenPayload = {
  userId: UserId;
};

export type CreateRefreshTokenPayload = CreateAccessTokenPayload & {
  ip: string;
  userAgent: string;
};
