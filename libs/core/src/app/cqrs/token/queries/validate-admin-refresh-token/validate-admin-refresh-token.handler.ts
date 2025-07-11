import { QueryHandler } from '@core/app/types';
import { ValidateAdminRefreshTokenQuery } from '@core/app/cqrs/token/queries/validate-admin-refresh-token/validate-admin-refresh-token.query';
import { AdminTokenValidateService } from '@core/app/components/admin-token/services/admin-token-validate.service';

export class ValidateAdminRefreshTokenHandler
  implements QueryHandler<ValidateAdminRefreshTokenQuery>
{
  constructor(private readonly _service: AdminTokenValidateService) {}

  async execute({ payload }: ValidateAdminRefreshTokenQuery) {
    return await this._service.validateRefreshToken(payload);
  }
}
