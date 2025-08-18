import { UserRefreshTokenDTO } from '../../dtos';

export interface UserRefreshTokenReadRepository {
  findById(id: string): Promise<UserRefreshTokenDTO | null>;

  findByOwnerId(ownerId: string): Promise<UserRefreshTokenDTO[]>;
}
