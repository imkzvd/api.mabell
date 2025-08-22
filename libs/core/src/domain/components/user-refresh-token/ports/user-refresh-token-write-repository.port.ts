import { UserRefreshToken } from '../user-refresh-token.entity';
import { UserRefreshTokenId } from '../types';

export interface UserRefreshTokenWriteRepository {
  save(entity: UserRefreshToken): Promise<void>;

  deleteById(tokenId: string): Promise<UserRefreshTokenId | null>;

  deleteByOwnerId(ownerId: string): Promise<{
    deletedIds: UserRefreshTokenId[];
    total: number;
  }>;
}
