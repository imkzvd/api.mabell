import * as process from 'process';
import { UserRefreshTokenId } from '@core/domain/components/user-refresh-token/types';
import { UserRefreshTokenFactory } from '@core/domain/components/user-refresh-token/user-refresh-token.factory';
import { UserRefreshTokenWriteRepository } from '@core/domain/components/user-refresh-token/user-refresh-token-write-repository.port';
import { JWTService, TokenTypes } from '../../../common/ports/jwt.service.port';
import { IdService } from '../../../common/ports/id.service.port';
import {
  AccessTokenPayload,
  CreateAccessTokenPayload,
  CreateRefreshTokenPayload,
  RefreshTokenPayload,
} from '../types';

export class UserTokenCreateService {
  constructor(
    private readonly _WR: UserRefreshTokenWriteRepository,
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
}
