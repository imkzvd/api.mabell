import { QueryHandler } from '@nestjs/cqrs';
import { ValidateAdminRefreshTokenQuery } from '@core/app/cqrs/token/queries/validate-admin-refresh-token/validate-admin-refresh-token.query';
import { ValidateAdminRefreshTokenHandler as CoreValidateAdminRefreshTokenHandler } from '@core/app/cqrs/token/queries/validate-admin-refresh-token/validate-admin-refresh-token.handler';
import { AdminTokenValidateService } from '@core/app/components/admin-token/services/admin-token-validate.service';

@QueryHandler(ValidateAdminRefreshTokenQuery)
export class ValidateAdminRefreshTokenHandler extends CoreValidateAdminRefreshTokenHandler {
  constructor(service: AdminTokenValidateService) {
    super(service);
  }
}
