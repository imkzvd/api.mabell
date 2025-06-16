import { RefreshTokenId } from '../../types';
import { AdminId } from '../../../admin/types';
import { UserId } from '../../../user/types';

export class RefreshTokenDTO {
  constructor(
    public readonly id: RefreshTokenId,
    public readonly owner: AdminId | UserId,
    public readonly ip: string,
    public readonly userAgent: string,
    public readonly createdAt: Date,
  ) {}
}
