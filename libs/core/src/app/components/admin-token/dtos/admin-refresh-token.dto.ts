import { AdminId } from '@core/domain/components/admin/types';
import { AdminRefreshTokenId } from '@core/domain/components/admin-refresh-token/types';
import { AdminRole } from '@core/domain/components/admin/constants/admin-roles';

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
