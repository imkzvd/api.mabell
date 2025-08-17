import { AdminId, AdminRole } from '../../../../domain/components/admin';

export class AdminDTO {
  constructor(
    public readonly id: AdminId,
    public readonly username: string,
    public readonly name: string,
    public readonly isBlocked: boolean,
    public readonly role: AdminRole,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
