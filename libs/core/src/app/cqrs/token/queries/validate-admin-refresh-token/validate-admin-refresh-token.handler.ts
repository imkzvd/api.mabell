import { QueryHandler } from '../../../../types';
import { ValidateAdminRefreshTokenQuery } from './validate-admin-refresh-token.query';
import { AdminTokenValidateService } from '../../../../components/admin-token';

export class ValidateAdminRefreshTokenHandler
  implements QueryHandler<ValidateAdminRefreshTokenQuery>
{
  constructor(private readonly _service: AdminTokenValidateService) {}

  execute({ payload }: ValidateAdminRefreshTokenQuery) {
    return this._service.validateRefreshToken(payload);
  }
}
