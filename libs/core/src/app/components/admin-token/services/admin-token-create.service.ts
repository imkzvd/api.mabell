import * as process from 'process';
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
import { AdminRefreshTokenId } from '../../../../domain/components/admin-refresh-token';

export class AdminTokenCreateService {
  constructor(
    private readonly _WR: AdminRefreshTokenWriteRepository,
    private readonly _IdService: IdService,
    private readonly _JWTService: JWTService,
  ) {}

  createAccessToken({ adminId, role }: CreateAccessTokenPayload): string {
    return this._JWTService.create<AccessTokenCustomPayload>({
      subject: adminId,
      type: TokenTypes.Access,
      payload: { role },
      secret: process.env.JWT_ACCESS_SECRET || 'accessSecret',
      expiresIn: parseInt(process.env.JWT_ACCESS_EXPIRES_IN || '300', 10),
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

    return this._JWTService.create({
      jti: createdRefreshedToken.getId(),
      subject: createdRefreshedToken.getOwner(),
      type: TokenTypes.Refresh,
      secret: process.env.JWT_REFRESH_SECRET || 'refreshSecret',
      expiresIn: parseInt(process.env.JWT_REFRESH_EXPIRES_IN || '300', 10),
    });
  }
}
