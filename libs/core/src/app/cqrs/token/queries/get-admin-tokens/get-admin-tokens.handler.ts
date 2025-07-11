import { QueryHandler } from '@core/app/types';
import { GetAdminTokensQuery } from '@core/app/cqrs/token/queries/get-admin-tokens/get-admin-tokens.query';
import { AdminTokenService } from '@core/app/components/admin-token/services/admin-token.service';

export class GetAdminTokensHandler implements QueryHandler<GetAdminTokensQuery> {
  constructor(private readonly _service: AdminTokenService) {}

  async execute({ adminId }: GetAdminTokensQuery) {
    return await this._service.findRefreshTokensByAdminId(adminId);
  }
}
