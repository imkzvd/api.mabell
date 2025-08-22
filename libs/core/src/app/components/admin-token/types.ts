import { AdminId, AdminRole } from '../../../domain/components/admin';
import { BaseTokenPayload, BaseTokenWithIdPayload } from '../../ports/jwt/types';

export type AccessTokenCustomPayload = { role: AdminRole };

export type AccessTokenPayload = AccessTokenCustomPayload & BaseTokenPayload;

export type RefreshTokenPayload = BaseTokenWithIdPayload;

export type CreateAccessTokenPayload = {
  adminId: AdminId;
  role: AdminRole;
};

export type CreateRefreshTokenPayload = CreateAccessTokenPayload & {
  ip: string;
  userAgent: string;
};

export type ValidateRefreshTokenPayload = {
  token: string;
  ip: string;
  userAgent: string;
};
