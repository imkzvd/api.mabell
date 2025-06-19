import { AdminRefreshTokenId } from '../../types';
import { AdminId } from '../../../admin/types';
import { AdminRole } from '../../../admin/constants/admin-roles';

export class AdminRefreshTokenDTO {
  constructor(
    public readonly id: AdminRefreshTokenId,
    public readonly owner: AdminId,
    public readonly role: AdminRole,
    public readonly ip: string,
    public readonly userAgent: string,
    public readonly createdAt: Date,
  ) {}
}
