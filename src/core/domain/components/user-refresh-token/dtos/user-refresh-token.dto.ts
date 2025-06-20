import { UserRefreshTokenId } from '../types';
import { UserId } from '../../user/types';

export class UserRefreshTokenDTO {
  constructor(
    public readonly id: UserRefreshTokenId,
    public readonly owner: UserId,
    public readonly ip: string,
    public readonly userAgent: string,
    public readonly createdAt: Date,
  ) {}
}
