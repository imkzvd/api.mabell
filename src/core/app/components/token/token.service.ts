import { Inject } from '@nestjs/common';
import * as process from 'process';
import { JWT_SERVICE_DI_TOKEN, JWTService } from '../../common/ports/jwt.service.port';
import {
  AdminAccessTokenPayload,
  AdminRefreshTokenPayload,
  CreateAdminAccessTokenPayload,
  CreateAdminRefreshTokenPayload,
  CreateUserAccessTokenPayload,
  CreateUserRefreshTokenPayload,
  UserAccessTokenPayload,
  UserRefreshTokenPayload,
} from './types';
import { RefreshTokenFactory } from '../../../domain/components/refresh-token/refresh-token.factory';
import { ID_SERVICE_DI_TOKEN, IdService } from '../../common/ports/id-service.port';
import { RefreshTokenId } from '../../../domain/components/refresh-token/types';
import {
  REFRESH_TOKEN_WRITE_REPOSITORY_DI_TOKEN,
  RefreshTokenWriteRepository,
} from '../../../domain/components/refresh-token/repository/refresh-token-write-repository.port';
import { RefreshTokenDTO } from '../../../domain/components/refresh-token/repository/dtos/refresh-token.dto';
import {
  REFRESH_TOKEN_READ_REPOSITORY_DI_TOKEN,
  RefreshTokenReadRepository,
} from '../../../domain/components/refresh-token/repository/refresh-token-read-repository.port';
import { NotFoundException } from '../../../shared/exceptions';

export class TokenService {
  constructor(
    @Inject(REFRESH_TOKEN_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _WR: RefreshTokenWriteRepository,
    @Inject(REFRESH_TOKEN_READ_REPOSITORY_DI_TOKEN)
    private readonly _RR: RefreshTokenReadRepository,
    @Inject(ID_SERVICE_DI_TOKEN) private readonly _IdService: IdService<RefreshTokenId>,
    @Inject(JWT_SERVICE_DI_TOKEN) private readonly _JWTService: JWTService,
  ) {}

  createAdminAccessToken(payload: CreateAdminAccessTokenPayload): string {
    return this._JWTService.create<AdminAccessTokenPayload>(
      {
        ownerId: payload.adminId,
        role: payload.role,
      },
      process.env.ACCESS_TOKEN_SECRET || 'accessSecret',
      process.env.ACCESS_TOKEN_EXPIRATION ? parseInt(process.env.ACCESS_TOKEN_EXPIRATION) : 300,
    );
  }

  async createAdminRefreshToken({
    adminId,
    ip,
    userAgent,
  }: CreateAdminRefreshTokenPayload): Promise<string> {
    const generatedRefreshTokenId = this._IdService.generate();
    const createdRefreshedToken = RefreshTokenFactory.create({
      id: generatedRefreshTokenId,
      owner: adminId,
      ip,
      userAgent,
    });

    const createdToken = this._JWTService.create<AdminRefreshTokenPayload>(
      {
        ownerId: adminId,
        tokenId: generatedRefreshTokenId,
      },
      process.env.REFRESH_TOKEN_SECRET || 'refreshSecret',
      process.env.REFRESH_TOKEN_EXPIRATION ? parseInt(process.env.REFRESH_TOKEN_EXPIRATION) : 600,
    );

    await this._WR.save(createdRefreshedToken);

    return createdToken;
  }

  createUserAccessToken({ userId }: CreateUserAccessTokenPayload): string {
    return this._JWTService.create<UserAccessTokenPayload>(
      {
        ownerId: userId,
      },
      process.env.ACCESS_TOKEN_SECRET || 'accessSecret',
      process.env.ACCESS_TOKEN_EXPIRATION ? parseInt(process.env.ACCESS_TOKEN_EXPIRATION) : 300,
    );
  }

  async createUserRefreshToken({
    userId,
    ip,
    userAgent,
  }: CreateUserRefreshTokenPayload): Promise<string> {
    const generatedRefreshTokenId = this._IdService.generate();
    const createdRefreshedToken = RefreshTokenFactory.create({
      id: generatedRefreshTokenId,
      owner: userId,
      ip,
      userAgent,
    });

    const createdToken = this._JWTService.create<UserRefreshTokenPayload>(
      {
        ownerId: userId,
        tokenId: generatedRefreshTokenId,
      },
      process.env.REFRESH_TOKEN_SECRET || 'refreshSecret',
      process.env.REFRESH_TOKEN_EXPIRATION ? parseInt(process.env.REFRESH_TOKEN_EXPIRATION) : 600,
    );

    await this._WR.save(createdRefreshedToken);

    return createdToken;
  }

  async deleteRefreshToken(id: string): Promise<RefreshTokenId> {
    const deletedRefreshTokenId = await this._WR.deleteById(id);

    if (!deletedRefreshTokenId) {
      throw new NotFoundException('Token does not exist');
    }

    return deletedRefreshTokenId;
  }

  async deleteRefreshTokensByOwnerId(id: string): Promise<void> {
    await this._WR.deleteByOwnerId(id);
  }

  async getRefreshTokensByOwnerId(id: string): Promise<RefreshTokenDTO[]> {
    return this._RR.findByOwnerId(id);
  }
}
