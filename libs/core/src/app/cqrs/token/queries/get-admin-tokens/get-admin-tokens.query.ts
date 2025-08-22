import { Query } from '../../../../types';
import { AdminRefreshTokenDTO } from '../../../../dtos';

export class GetAdminTokensQuery extends Query<AdminRefreshTokenDTO[]> {
  constructor(public readonly adminId: string) {
    super();
  }
}
