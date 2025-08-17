import { AdminId, AdminRole } from '../../../../domain/components/admin';
import { AdminRefreshTokenId } from '../../../../domain/components/admin-refresh-token';

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
