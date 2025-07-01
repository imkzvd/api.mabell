import * as process from 'process';
import { NotFoundException, UnauthorizedException } from '@core/shared/exceptions';
import { UserRefreshTokenId } from '@core/domain/components/user-refresh-token/types';
import { UserRefreshTokenFactory } from '@core/domain/components/user-refresh-token/user-refresh-token.factory';
import { UserRefreshTokenWriteRepository } from '@core/domain/components/user-refresh-token/user-refresh-token-write-repository.port';
import { UserRefreshTokenReadRepository } from '@core/domain/components/user-refresh-token/user-refresh-token-read-repository.port';
import { JWTService, TokenTypes } from '../../common/ports/jwt.service.port';
import { IdService } from '../../common/ports/id.service.port';
import {
  AccessTokenPayload,
  CreateAccessTokenPayload,
  CreateRefreshTokenPayload,
  RefreshTokenPayload,
} from './types';
import UserRefreshTokenMapper from './dtos/user-refresh-token.mapper';
import { UserRefreshTokenDTO } from './dtos/user-refresh-token.dto';

export class UserTokenService {
  constructor(
    private readonly _WR: UserRefreshTokenWriteRepository,
    private readonly _RR: UserRefreshTokenReadRepository,
    private readonly _IdService: IdService<UserRefreshTokenId>,
    private readonly _JWTService: JWTService,
  ) {}

  createAccessToken(payload: CreateAccessTokenPayload): string {
    return this._JWTService.create<AccessTokenPayload>({
      type: TokenTypes.Access,
      subject: payload.userId,
      secret: process.env.ACCESS_TOKEN_SECRET || 'accessSecret',
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION
        ? parseInt(process.env.ACCESS_TOKEN_EXPIRATION)
        : 300,
    });
  }

  async createRefreshToken({ userId, ip, userAgent }: CreateRefreshTokenPayload): Promise<string> {
    const generatedRefreshTokenId = this._IdService.generate();
    const createdRefreshedToken = UserRefreshTokenFactory.create({
      id: generatedRefreshTokenId,
      owner: userId,
      ip,
      userAgent,
    });

    await this._WR.save(createdRefreshedToken);

    return this._JWTService.create<RefreshTokenPayload>({
      type: TokenTypes.Refresh,
      subject: userId,
      jti: generatedRefreshTokenId,
      secret: process.env.REFRESH_TOKEN_SECRET || 'refreshSecret',
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION
        ? parseInt(process.env.REFRESH_TOKEN_EXPIRATION)
        : 600,
    });
  }

  async refreshAccessToken(refreshTokenId: string, ownerId: string): Promise<string> {
    const foundRefreshToken = await this._RR.findById(refreshTokenId);

    if (!foundRefreshToken || foundRefreshToken.owner !== ownerId) {
      throw new UnauthorizedException();
    }

    return this.createAccessToken({ userId: foundRefreshToken.owner });
  }

  async deleteRefreshToken(id: string): Promise<UserRefreshTokenId> {
    const deletedRefreshTokenId = await this._WR.deleteById(id);

    if (!deletedRefreshTokenId) {
      throw new NotFoundException('Token does not exist');
    }

    return deletedRefreshTokenId;
  }

  async deleteRefreshTokensByUserId(id: string): Promise<void> {
    await this._WR.deleteByOwnerId(id);
  }

  async getRefreshTokensByUserId(id: string): Promise<UserRefreshTokenDTO[]> {
    const foundTokens = await this._RR.findByOwnerId(id);

    return foundTokens.map((i) => UserRefreshTokenMapper.toDTO(i));
  }
}
