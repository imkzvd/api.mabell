import { ConfigService } from '@nestjs/config';
import {
  AccessTokenCustomPayload,
  CreateAccessTokenPayload,
  CreateRefreshTokenPayload,
} from '../types';
import {
  AdminRefreshTokenFactory,
  AdminRefreshTokenWriteRepository,
} from '../../../../domain/components/admin-refresh-token';
import { IdService, JWTService } from '../../../ports';
import { TokenTypes } from '../../../ports/jwt/types';
import { AdminRefreshTokenId } from '../../../../domain/components/admin-refresh-token/types';

export class AdminTokenCreateService {
  constructor(
    private readonly _WR: AdminRefreshTokenWriteRepository,
    private readonly _IdService: IdService,
    private readonly _JWTService: JWTService,
    private readonly _configService: ConfigService,
  ) {}

  createAccessToken({ adminId, role }: CreateAccessTokenPayload): string {
    const accessTokenSecret = this._configService.get<string>('jwt.accessToken.secret');
    const accessTokenExpiration = this._configService.get<number>('jwt.accessToken.expiresIn');

    return this._JWTService.create<AccessTokenCustomPayload>({
      subject: adminId,
      type: TokenTypes.Access,
      payload: { role },
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
    const generatedRefreshTokenId = this._IdService.generate<AdminRefreshTokenId>();
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
