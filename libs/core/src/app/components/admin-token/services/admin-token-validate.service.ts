import * as process from 'process';
import { AdminRefreshTokenReadRepository } from '@core/domain/components/admin-refresh-token/repository/admin-refresh-token-read-repository.port';
import { JWTService } from '@core/app/common/ports/jwt.service.port';
import { RefreshTokenPayload } from '../types';
import { AdminRefreshTokenDTO } from '../dtos/admin-refresh-token.dto';
import AdminRefreshTokenMapper from '../dtos/admin-refresh-token.mapper';

export class AdminTokenValidateService {
  constructor(
    private readonly _RR: AdminRefreshTokenReadRepository,
    private readonly _JWTService: JWTService,
  ) {}

  async validateRefreshToken(payload: {
    token: string;
    ip: string;
    userAgent: string;
  }): Promise<AdminRefreshTokenDTO | null> {
    const refreshTokenPayload = this._JWTService.decode<RefreshTokenPayload>(
      payload.token,
      process.env.REFRESH_TOKEN_SECRET || 'refreshSecret',
    );

    if (!refreshTokenPayload) {
      return null;
    }

    const foundRefreshToken = await this._RR.findById(refreshTokenPayload.jti);

    if (
      !foundRefreshToken ||
      foundRefreshToken.owner !== refreshTokenPayload.sub ||
      foundRefreshToken.ip !== payload.ip ||
      foundRefreshToken.userAgent !== payload.userAgent
    ) {
      return null;
    }

    return AdminRefreshTokenMapper.toDTO(foundRefreshToken);
  }
}
