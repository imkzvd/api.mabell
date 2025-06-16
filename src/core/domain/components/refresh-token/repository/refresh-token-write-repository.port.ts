import { RefreshToken } from '../refresh-token.entity';
import { RefreshTokenId } from '../types';

export const REFRESH_TOKEN_WRITE_REPOSITORY_DI_TOKEN = Symbol(
  'REFRESH_TOKEN_WRITE_REPOSITORY_DI_TOKEN',
);

export interface RefreshTokenWriteRepository {
  save(entity: RefreshToken): Promise<void>;

  deleteById(id: string): Promise<RefreshTokenId | null>;

  deleteByOwnerId(ownerId: string): Promise<{
    deletedIds: RefreshTokenId[];
    total: number;
  }>;
}
