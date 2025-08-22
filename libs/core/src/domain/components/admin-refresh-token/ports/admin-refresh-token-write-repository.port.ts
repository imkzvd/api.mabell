import { AdminRefreshToken } from '../admin-refresh-token.entity';
import { AdminRefreshTokenId } from '../types';

export interface AdminRefreshTokenWriteRepository {
  save(entity: AdminRefreshToken): Promise<void>;

  deleteById(tokenId: string): Promise<AdminRefreshTokenId | null>;

  deleteByOwnerId(ownerId: string): Promise<{
    deletedIds: AdminRefreshTokenId[];
    total: number;
  }>;
}
