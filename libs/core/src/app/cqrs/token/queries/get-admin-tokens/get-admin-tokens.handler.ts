import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAdminTokensQuery } from './get-admin-tokens.query';
import { AdminTokenService } from '../../../../components/admin-token/admin-token.service';

@QueryHandler(GetAdminTokensQuery)
export class GetAdminTokensHandler implements IQueryHandler<GetAdminTokensQuery> {
  constructor(@Inject(AdminTokenService) private readonly _tokenService: AdminTokenService) {}

  async execute({ adminId }: GetAdminTokensQuery) {
    return await this._tokenService.getRefreshTokensByAdminId(adminId);
  }
}
