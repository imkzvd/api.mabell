import * as process from 'process';
import { RefreshTokenPayload } from '../types';
import { AdminRefreshTokenWriteRepository } from '../../../../domain/components/admin-refresh-token';
import { NotFoundException } from '../../../../shared/exceptions';
import { JWTService } from '../../../ports';
import { AdminRefreshTokenId } from '../../../../domain/components/admin-refresh-token/types';

export class AdminTokenDeleteService {
  constructor(
    private readonly _WR: AdminRefreshTokenWriteRepository,
    private readonly _JWTService: JWTService,
  ) {}

  async deleteRefreshTokenByToken(token: string): Promise<void> {
    const tokenPayload = this._JWTService.decode<RefreshTokenPayload>(
      token,
      process.env.JWT_REFRESH_SECRET || 'refreshSecret',
    );

    if (!tokenPayload) return;

    await this._WR.deleteById(tokenPayload.jti);
  }

  async deleteRefreshTokenById(tokenId: string): Promise<AdminRefreshTokenId> {
    const deletedRefreshTokenId = await this._WR.deleteById(tokenId);

    if (!deletedRefreshTokenId) {
      throw new NotFoundException('Refresh token does not exist');
    }

    return deletedRefreshTokenId;
  }

  async deleteRefreshTokensByAdminId(adminId: string) {
    await this._WR.deleteByOwnerId(adminId);
  }
}
