import { Query } from '@nestjs/cqrs';

export class ValidateRefreshTokenQuery extends Query<boolean> {
  constructor(
    public readonly payload: {
      tokenId: string;
      adminId: string;
      ip: string;
      userAgent: string;
    },
  ) {
    super();
  }
}
