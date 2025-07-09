import * as process from 'process';
import { AdminRefreshTokenFactory } from '@core/domain/components/admin-refresh-token/admin-refresh-token.factory';
import { AdminRefreshTokenId } from '@core/domain/components/admin-refresh-token/types';
import { AdminRefreshTokenWriteRepository } from '@core/domain/components/admin-refresh-token/repository/admin-refresh-token-write-repository.port';
import { JWTService, TokenTypes } from '../../../common/ports/jwt.service.port';
import { IdService } from '../../../common/ports/id.service.port';
import {
  AccessTokenCustomPayload,
  CreateAccessTokenPayload,
  CreateRefreshTokenPayload,
} from '../types';

export class AdminTokenCreateService {
  constructor(
    private readonly _WR: AdminRefreshTokenWriteRepository,
    private readonly _IdService: IdService<AdminRefreshTokenId>,
    private readonly _JWTService: JWTService,
  ) {}

  createAccessToken(payload: CreateAccessTokenPayload): string {
    return this._JWTService.create<AccessTokenCustomPayload>({
      subject: payload.adminId,
      type: TokenTypes.Access,
      payload: { role: payload.role },
      secret: process.env.ACCESS_TOKEN_SECRET || 'accessSecret',
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION
        ? parseInt(process.env.ACCESS_TOKEN_EXPIRATION)
        : 300,
    });
  }

  async createRefreshToken({
    adminId,
    role,
    ip,
    userAgent,
  }: CreateRefreshTokenPayload): Promise<string> {
    const generatedRefreshTokenId = this._IdService.generate();
    const createdRefreshedToken = AdminRefreshTokenFactory.create({
      id: generatedRefreshTokenId,
      owner: adminId,
      role,
      ip,
      userAgent,
    });

    await this._WR.save(createdRefreshedToken);

    return this._JWTService.create({
      jti: createdRefreshedToken.getId(),
      subject: createdRefreshedToken.getOwner(),
      type: TokenTypes.Refresh,
      secret: process.env.REFRESH_TOKEN_SECRET || 'refreshSecret',
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION
        ? parseInt(process.env.REFRESH_TOKEN_EXPIRATION)
        : 600,
    });
  }
}
