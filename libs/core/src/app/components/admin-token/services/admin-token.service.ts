import { AdminRefreshTokenReadRepository } from '@core/domain/components/admin-refresh-token/repository/admin-refresh-token-read-repository.port';
import { AdminRefreshTokenDTO } from '../dtos/admin-refresh-token.dto';
import AdminRefreshTokenMapper from '../dtos/admin-refresh-token.mapper';

export class AdminTokenService {
  constructor(private readonly _RR: AdminRefreshTokenReadRepository) {}

  async findRefreshTokensByAdminId(id: string): Promise<AdminRefreshTokenDTO[]> {
    const foundTokens = await this._RR.findByOwnerId(id);

    return foundTokens.map((i) => AdminRefreshTokenMapper.toDTO(i));
  }
}
