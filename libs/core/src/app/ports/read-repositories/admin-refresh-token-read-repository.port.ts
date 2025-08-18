import { AdminRefreshTokenDTO } from '../../dtos';

export interface AdminRefreshTokenReadRepository {
  findById(id: string): Promise<AdminRefreshTokenDTO | null>;

  findByOwnerId(ownerId: string): Promise<AdminRefreshTokenDTO[]>;
}
