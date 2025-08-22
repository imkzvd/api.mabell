import { AdminRefreshTokenId } from '../../domain/components/admin-refresh-token';

export class AdminRefreshTokenDTO {
  constructor(
    public readonly id: AdminRefreshTokenId,
    public readonly owner: string,
    public readonly role: string,
    public readonly ip: string,
    public readonly userAgent: string,
    public readonly createdAt: Date,
  ) {}
}
