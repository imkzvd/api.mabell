import { AdminRole } from '@core/domain/components/admin/constants/admin-roles';
import { AdminId } from '@core/domain/components/admin/types';
import { BaseTokenPayload, BaseTokenWithIdPayload } from '../../common/ports/jwt.service.port';

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
