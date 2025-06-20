import { AdminRefreshTokenDTO } from './dtos/admin-refresh-token.dto';

export const ADMIN_REFRESH_TOKEN_READ_REPOSITORY_DI_TOKEN = Symbol(
  'ADMIN_REFRESH_TOKEN_READ_REPOSITORY_DI_TOKEN',
);

export interface AdminRefreshTokenReadRepository {
  findById(id: string): Promise<AdminRefreshTokenDTO | null>;

  findByOwnerId(ownerId: string): Promise<AdminRefreshTokenDTO[]>;
}
