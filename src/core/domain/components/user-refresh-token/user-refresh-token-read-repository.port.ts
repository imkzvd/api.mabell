import { UserRefreshTokenDTO } from './dtos/user-refresh-token.dto';

export const USER_REFRESH_TOKEN_READ_REPOSITORY_DI_TOKEN = Symbol(
  'USER_REFRESH_TOKEN_READ_REPOSITORY_DI_TOKEN',
);

export interface UserRefreshTokenReadRepository {
  findById(id: string): Promise<UserRefreshTokenDTO | null>;

  findByOwnerId(ownerId: string): Promise<UserRefreshTokenDTO[]>;
}
