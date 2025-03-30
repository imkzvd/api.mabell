import { AdminRole } from '../../../../domain/components/admin/constants/admin-roles';

export class AdminDTO {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly name: string,
    public readonly isBlocked: boolean,
    public readonly role: AdminRole,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
