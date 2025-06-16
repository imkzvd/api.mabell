import { RefreshTokenDTO } from './dtos/refresh-token.dto';

export const REFRESH_TOKEN_READ_REPOSITORY_DI_TOKEN = Symbol(
  'REFRESH_TOKEN_READ_REPOSITORY_DI_TOKEN',
);

export interface RefreshTokenReadRepository {
  findById(id: string): Promise<RefreshTokenDTO | null>;

  findByOwnerId(ownerId: string): Promise<RefreshTokenDTO[]>;
}
