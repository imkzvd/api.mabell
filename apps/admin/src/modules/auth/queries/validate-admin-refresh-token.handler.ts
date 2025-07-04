import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ValidateAdminRefreshTokenQuery } from '@core/app/cqrs/token/queries/validate-admin-refresh-token/validate-admin-refresh-token.query';
import { ValidateAdminRefreshTokenHandler as CoreValidateAdminRefreshTokenHandler } from '@core/app/cqrs/token/queries/validate-admin-refresh-token/validate-admin-refresh-token.handler';
import { AdminTokenService } from '@core/app/components/admin-token/admin-token.service';

@QueryHandler(ValidateAdminRefreshTokenQuery)
export class ValidateAdminRefreshTokenHandler extends CoreValidateAdminRefreshTokenHandler {
  constructor(@Inject(AdminTokenService) service: AdminTokenService) {
    super(service);
  }
}
