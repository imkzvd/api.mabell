import { Query } from '../../../../types';
import { AdminRefreshTokenDTO } from '../../../../dtos';

export class ValidateAdminRefreshTokenQuery extends Query<AdminRefreshTokenDTO | null> {
  constructor(
    public readonly payload: {
      token: string;
      ip: string;
      userAgent: string;
    },
  ) {
    super();
  }
}
