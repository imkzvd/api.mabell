import { AdminRoles } from '../constants/admin-roles';
import { AdminRoleLabel } from '../types';

export function getAdminRoleLabelByValue(value: string): AdminRoleLabel {
  return (Object.keys(AdminRoles) as AdminRoleLabel[]).find(
    (key) => AdminRoles[key] === value,
  ) as AdminRoleLabel;
}
