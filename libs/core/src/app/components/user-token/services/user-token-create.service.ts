import * as process from 'process';
import {
  AccessTokenPayload,
  CreateAccessTokenPayload,
  CreateRefreshTokenPayload,
  RefreshTokenPayload,
} from '../types';
import {
  UserRefreshTokenFactory,
  UserRefreshTokenWriteRepository,
} from '../../../../domain/components/user-refresh-token';
import { IdService, JWTService } from '../../../ports';
import { TokenTypes } from '../../../ports/jwt/types';
import { UserRefreshTokenId } from '../../../../domain/components/user-refresh-token/types';

export class UserTokenCreateService {
  constructor(
    private readonly _WR: UserRefreshTokenWriteRepository,
    private readonly _IdService: IdService,
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
    const generatedRefreshTokenId = this._IdService.generate<UserRefreshTokenId>();
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
