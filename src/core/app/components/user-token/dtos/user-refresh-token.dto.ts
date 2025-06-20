import { UserId } from '../../../../domain/components/user/types';
import { UserRefreshTokenId } from '../../../../domain/components/user-refresh-token/types';

export class UserRefreshTokenDTO {
  constructor(
    public readonly id: UserRefreshTokenId,
    public readonly owner: UserId,
    public readonly ip: string,
    public readonly userAgent: string,
    public readonly createdAt: Date,
  ) {}
}
