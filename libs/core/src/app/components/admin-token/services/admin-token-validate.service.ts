import * as process from 'process';
import { RefreshTokenPayload, ValidateRefreshTokenPayload } from '../types';
import { AdminRefreshTokenReadRepository, JWTService } from '../../../ports';
import { AdminRefreshTokenDTO } from '../../../dtos';

export class AdminTokenValidateService {
  constructor(
    private readonly _RR: AdminRefreshTokenReadRepository,
    private readonly _JWTService: JWTService,
  ) {}

  async validateRefreshToken(
    payload: ValidateRefreshTokenPayload,
  ): Promise<AdminRefreshTokenDTO | null> {
    const refreshTokenPayload = this._JWTService.decode<RefreshTokenPayload>(
      payload.token,
      process.env.JWT_REFRESH_SECRET || 'refreshSecret',
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

    return foundRefreshToken;
  }
}
