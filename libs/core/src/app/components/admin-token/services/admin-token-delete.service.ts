import * as process from 'process';
import { NotFoundException } from '@core/shared/exceptions';
import { AdminRefreshTokenId } from '@core/domain/components/admin-refresh-token/types';
import { AdminRefreshTokenWriteRepository } from '@core/domain/components/admin-refresh-token/repository/admin-refresh-token-write-repository.port';
import { JWTService } from '@core/app/common/ports/jwt.service.port';
import { RefreshTokenPayload } from '../types';

export class AdminTokenDeleteService {
  constructor(
    private readonly _WR: AdminRefreshTokenWriteRepository,
    private readonly _JWTService: JWTService,
  ) {}

  async deleteRefreshToken(token: string): Promise<void> {
    const tokenPayload = this._JWTService.decode<RefreshTokenPayload>(
      token,
      process.env.REFRESH_TOKEN_SECRET || 'refreshSecret',
    );

    if (!tokenPayload) return;

    await this._WR.deleteById(tokenPayload.jti);
  }

  async deleteRefreshTokenById(id: string): Promise<AdminRefreshTokenId> {
    const deletedRefreshTokenId = await this._WR.deleteById(id);

    if (!deletedRefreshTokenId) {
      throw new NotFoundException('Refresh token does not exist');
    }

    return deletedRefreshTokenId;
  }

  deleteRefreshTokensByAdminId(id: string) {
    void this._WR.deleteByOwnerId(id);
  }
}
