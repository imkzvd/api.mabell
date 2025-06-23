import { AdminRefreshToken } from '../admin-refresh-token.entity';
import { AdminRefreshTokenId } from '../types';

export const ADMIN_REFRESH_TOKEN_WRITE_REPOSITORY_DI_TOKEN = Symbol(
  'ADMIN_REFRESH_TOKEN_WRITE_REPOSITORY_DI_TOKEN',
);

export interface AdminRefreshTokenWriteRepository {
  save(entity: AdminRefreshToken): Promise<void>;

  deleteById(id: string): Promise<AdminRefreshTokenId | null>;

  deleteByOwnerId(ownerId: string): Promise<{
    deletedIds: AdminRefreshTokenId[];
    total: number;
  }>;
}
