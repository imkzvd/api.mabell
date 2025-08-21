import { UserRefreshTokenDTO } from '../../dtos';

export interface UserRefreshTokenReadRepository {
  findById(tokenId: string): Promise<UserRefreshTokenDTO | null>;

  findByOwnerId(ownerId: string): Promise<UserRefreshTokenDTO[]>;
}
