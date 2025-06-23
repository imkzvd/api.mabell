import { UserRefreshTokenDTO } from './dtos/user-refresh-token.dto';

export interface UserRefreshTokenReadRepository {
  findById(id: string): Promise<UserRefreshTokenDTO | null>;

  findByOwnerId(ownerId: string): Promise<UserRefreshTokenDTO[]>;
}
