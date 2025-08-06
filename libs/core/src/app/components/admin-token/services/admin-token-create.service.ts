import { ConfigService } from '@nestjs/config';
import { AdminRefreshTokenFactory } from '@core/domain/components/admin-refresh-token/admin-refresh-token.factory';
import { AdminRefreshTokenId } from '@core/domain/components/admin-refresh-token/types';
import { AdminRefreshTokenWriteRepository } from '@core/domain/components/admin-refresh-token/repository/admin-refresh-token-write-repository.port';
import { IdService } from '@core/app/common/ports/id.service.port';
import { JWTService, TokenTypes } from '@core/app/common/ports/jwt.service.port';
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
    private readonly _configService: ConfigService,
  ) {}

  createAccessToken(payload: CreateAccessTokenPayload): string {
    const accessTokenSecret = this._configService.get<string>('jwt.accessToken.secret');
    const accessTokenExpiration = this._configService.get<number>('jwt.accessToken.expiresIn');

    return this._JWTService.create<AccessTokenCustomPayload>({
      subject: payload.adminId,
      type: TokenTypes.Access,
      payload: { role: payload.role },
      secret: accessTokenSecret || 'accessSecret',
      expiresIn: accessTokenExpiration || 300,
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

    const refreshTokenSecret = this._configService.get<string>('jwt.refreshToken.secret');
    const refreshTokenExpiration = this._configService.get<number>('jwt.refreshToken.expiresIn');

    return this._JWTService.create({
      jti: createdRefreshedToken.getId(),
      subject: createdRefreshedToken.getOwner(),
      type: TokenTypes.Refresh,
      secret: refreshTokenSecret || 'refreshSecret',
      expiresIn: refreshTokenExpiration || 300,
    });
  }
}
