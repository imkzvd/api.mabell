import { QueryHandler } from '@core/app/types';
import { ValidateAdminRefreshTokenQuery } from '@core/app/cqrs/token/queries/validate-admin-refresh-token/validate-admin-refresh-token.query';
import { AdminTokenService } from '@core/app/components/admin-token/admin-token.service';

export class ValidateAdminRefreshTokenHandler
  implements QueryHandler<ValidateAdminRefreshTokenQuery>
{
  constructor(private readonly _tokenService: AdminTokenService) {}

  async execute({ payload }: ValidateAdminRefreshTokenQuery) {
    return await this._tokenService.validateRefreshToken(payload);
  }
}
