import { AdminRole } from '../../../../domain/components/admin/constants/admin-roles';
import { AdminId } from '../../../../domain/components/admin/types';

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
