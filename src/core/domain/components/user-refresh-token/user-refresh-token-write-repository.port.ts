import { UserRefreshToken } from './user-refresh-token.entity';
import { UserRefreshTokenId } from './types';

export const USER_REFRESH_TOKEN_WRITE_REPOSITORY_DI_TOKEN = Symbol(
  'USER_REFRESH_TOKEN_WRITE_REPOSITORY_DI_TOKEN',
);

export interface UserRefreshTokenWriteRepository {
  save(entity: UserRefreshToken): Promise<void>;

  deleteById(id: string): Promise<UserRefreshTokenId | null>;

  deleteByOwnerId(ownerId: string): Promise<{
    deletedIds: UserRefreshTokenId[];
    total: number;
  }>;
}
