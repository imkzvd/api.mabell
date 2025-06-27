import { QueryHandler } from '@core/app/types';
import { AdminTokenService } from '@core/app/components/admin-token/admin-token.service';
import { GetAdminTokensQuery } from '@core/app/cqrs/token/queries/get-admin-tokens/get-admin-tokens.query';

export class GetAdminTokensHandler implements QueryHandler<GetAdminTokensQuery> {
  constructor(private readonly _tokenService: AdminTokenService) {}

  async execute({ adminId }: GetAdminTokensQuery) {
    return await this._tokenService.getRefreshTokensByAdminId(adminId);
  }
}
