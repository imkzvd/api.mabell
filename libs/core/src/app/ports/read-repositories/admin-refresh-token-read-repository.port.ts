import { AdminRefreshTokenDTO } from '../../dtos';

export interface AdminRefreshTokenReadRepository {
  findById(tokenId: string): Promise<AdminRefreshTokenDTO | null>;

  findByOwnerId(ownerId: string): Promise<AdminRefreshTokenDTO[]>;
}
