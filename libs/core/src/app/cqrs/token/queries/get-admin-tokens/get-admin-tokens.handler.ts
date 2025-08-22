import { GetAdminTokensQuery } from './get-admin-tokens.query';
import { QueryHandler } from '../../../../types';
import { AdminTokenService } from '../../../../components/admin-token';

export class GetAdminTokensHandler implements QueryHandler<GetAdminTokensQuery> {
  constructor(private readonly _service: AdminTokenService) {}

  async execute({ adminId }: GetAdminTokensQuery) {
    return await this._service.findRefreshTokensByAdminId(adminId);
  }
}
