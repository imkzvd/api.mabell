import { UserRefreshTokenId } from '../../domain/components/user-refresh-token';

export class UserRefreshTokenDTO {
  constructor(
    public readonly id: UserRefreshTokenId,
    public readonly owner: string,
    public readonly ip: string,
    public readonly userAgent: string,
    public readonly createdAt: Date,
  ) {}
}
