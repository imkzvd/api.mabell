import { AdminRefreshTokenDTO } from './dtos/admin-refresh-token.dto';

export interface AdminRefreshTokenReadRepository {
  findById(id: string): Promise<AdminRefreshTokenDTO | null>;

  findByOwnerId(ownerId: string): Promise<AdminRefreshTokenDTO[]>;
}
