import { Query } from '@core/app/types';
import { AdminRefreshTokenDTO } from '@core/app/components/admin-token/dtos/admin-refresh-token.dto';

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
