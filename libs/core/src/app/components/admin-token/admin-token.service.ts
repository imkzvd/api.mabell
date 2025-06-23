import { Inject } from '@nestjs/common';
import * as process from 'process';
import { JWT_SERVICE_DI_TOKEN, JWTService, TokenTypes } from '../../common/ports/jwt.service.port';
import { AdminRefreshTokenFactory } from '../../../domain/components/admin-refresh-token/admin-refresh-token.factory';
import { ID_SERVICE_DI_TOKEN, IdService } from '../../common/ports/id.service.port';
import { AdminRefreshTokenId } from '../../../domain/components/admin-refresh-token/types';
import {
  ADMIN_REFRESH_TOKEN_WRITE_REPOSITORY_DI_TOKEN,
  AdminRefreshTokenWriteRepository,
} from '../../../domain/components/admin-refresh-token/repository/admin-refresh-token-write-repository.port';
import {
  ADMIN_REFRESH_TOKEN_READ_REPOSITORY_DI_TOKEN,
  AdminRefreshTokenReadRepository,
} from '../../../domain/components/admin-refresh-token/repository/admin-refresh-token-read-repository.port';
import {
  AccessTokenCustomPayload,
  CreateAccessTokenPayload,
  CreateRefreshTokenPayload,
  RefreshTokenPayload,
} from './types';
import { AdminRefreshTokenDTO } from './dtos/admin-refresh-token.dto';
import AdminRefreshTokenMapper from './dtos/admin-refresh-token.mapper';

export class AdminTokenService {
  constructor(
    @Inject(ADMIN_REFRESH_TOKEN_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _WR: AdminRefreshTokenWriteRepository,
    @Inject(ADMIN_REFRESH_TOKEN_READ_REPOSITORY_DI_TOKEN)
    private readonly _RR: AdminRefreshTokenReadRepository,
    @Inject(ID_SERVICE_DI_TOKEN) private readonly _IdService: IdService<AdminRefreshTokenId>,
    @Inject(JWT_SERVICE_DI_TOKEN) private readonly _JWTService: JWTService,
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

  async deleteRefreshToken(token: string): Promise<void> {
    const tokenPayload = this._JWTService.decode<RefreshTokenPayload>(
      token,
      process.env.REFRESH_TOKEN_SECRET || 'refreshSecret',
    );

    if (!tokenPayload) return;

    await this._WR.deleteById(tokenPayload.jti);
  }

  async deleteRefreshTokensByAdminId(id: string): Promise<void> {
    await this._WR.deleteByOwnerId(id);
  }

  async getRefreshTokensByAdminId(id: string): Promise<AdminRefreshTokenDTO[]> {
    const foundTokens = await this._RR.findByOwnerId(id);

    return foundTokens.map((i) => AdminRefreshTokenMapper.toDTO(i));
  }
}
