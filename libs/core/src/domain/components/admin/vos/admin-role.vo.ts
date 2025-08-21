import { AdminRoles } from '../constants/admin-roles';
import { BadRequestException } from '../../../../shared/exceptions';
import { AdminRole } from '../types';

export class AdminRoleVO {
  private constructor(public readonly value: AdminRole) {}

  static create(role: string): AdminRoleVO {
    if (!(Object.values(AdminRoles) as string[]).includes(role)) {
      throw new BadRequestException('Invalid admin role');
    }

    return new AdminRoleVO(role as AdminRole);
  }
}
