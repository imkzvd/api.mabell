import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AdminTokenService } from '../../../../components/admin-token/admin-token.service';
import { ValidateAdminRefreshTokenQuery } from './validate-admin-refresh-token.query';

@QueryHandler(ValidateAdminRefreshTokenQuery)
export class ValidateAdminRefreshTokenHandler
  implements IQueryHandler<ValidateAdminRefreshTokenQuery>
{
  constructor(@Inject(AdminTokenService) private readonly _tokenService: AdminTokenService) {}

  async execute({ payload }: ValidateAdminRefreshTokenQuery) {
    return await this._tokenService.validateRefreshToken(payload);
  }
}
