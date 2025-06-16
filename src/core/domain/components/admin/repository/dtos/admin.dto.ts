import { AdminRole } from '../../constants/admin-roles';
import { AdminId } from '../../types';

export class AdminDTO {
  constructor(
    public readonly id: AdminId,
    public readonly username: string,
    public readonly password: string,
    public readonly name: string,
    public readonly isBlocked: boolean,
    public readonly role: AdminRole,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
