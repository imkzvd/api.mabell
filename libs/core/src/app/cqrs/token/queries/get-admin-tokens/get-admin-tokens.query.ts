import { Query } from '@core/app/types';
import { AdminRefreshTokenDTO } from '@core/app/components/admin-token/dtos/admin-refresh-token.dto';

export class GetAdminTokensQuery extends Query<AdminRefreshTokenDTO[]> {
  constructor(public readonly adminId: string) {
    super();
  }
}
