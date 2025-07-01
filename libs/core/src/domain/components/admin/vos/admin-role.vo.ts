import { BadRequestException } from '@core/shared/exceptions';
import { AdminRole, AdminRoles } from '../constants/admin-roles';

export class AdminRoleVO {
  private constructor(public readonly value: AdminRole) {}

  static create(role: string): AdminRoleVO {
    if (!(Object.values(AdminRoles) as string[]).includes(role)) {
      throw new BadRequestException('Invalid admin role');
    }

    return new AdminRoleVO(role as AdminRole);
  }
}
