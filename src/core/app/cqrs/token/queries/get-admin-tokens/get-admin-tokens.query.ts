import { Query } from '@nestjs/cqrs';
import { AdminRefreshTokenDTO } from '../../../../components/admin-token/dtos/admin-refresh-token.dto';

export class GetAdminTokensQuery extends Query<AdminRefreshTokenDTO[]> {
  constructor(public readonly adminId: string) {
    super();
  }
}
