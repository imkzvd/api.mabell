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
import { UserRefreshTokenId } from '../../../../domain/components/user-refresh-token';

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
      secret: process.env.JWT_ACCESS_SECRET || 'accessSecret',
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
        ? parseInt(process.env.JWT_ACCESS_EXPIRES_IN)
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
      secret: process.env.JWT_REFRESH_SECRET || 'refreshSecret',
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
        ? parseInt(process.env.JWT_REFRESH_EXPIRES_IN)
        : 600,
    });
  }
}
