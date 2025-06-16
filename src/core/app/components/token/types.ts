import { AdminId } from '../../../domain/components/admin/types';
import { AdminRole } from '../../../domain/components/admin/constants/admin-roles';
import { UserId } from '../../../domain/components/user/types';
import { EntityId } from '../../../domain/common/types/entity-id.type';
import { RefreshTokenId } from '../../../domain/components/refresh-token/types';

export type TokenPayload<T extends EntityId<string>> = {
  ownerId: T;
};

export type AdminAccessTokenPayload = TokenPayload<AdminId> & {
  role: AdminRole;
};

export type AdminRefreshTokenPayload = TokenPayload<AdminId> & {
  tokenId: RefreshTokenId;
};

export type UserAccessTokenPayload = TokenPayload<UserId>;

export type UserRefreshTokenPayload = TokenPayload<UserId> & {
  tokenId: RefreshTokenId;
};

export type CreateAdminAccessTokenPayload = {
  adminId: AdminId;
  role: AdminRole;
};

export type CreateAdminRefreshTokenPayload = {
  adminId: AdminId;
  ip: string;
  userAgent: string;
};

export type CreateUserAccessTokenPayload = {
  userId: UserId;
};

export type CreateUserRefreshTokenPayload = {
  userId: UserId;
  ip: string;
  userAgent: string;
};
