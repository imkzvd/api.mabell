import { Query } from '@nestjs/cqrs';
import { AdminRefreshTokenDTO } from '../../../../components/admin-token/dtos/admin-refresh-token.dto';

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
