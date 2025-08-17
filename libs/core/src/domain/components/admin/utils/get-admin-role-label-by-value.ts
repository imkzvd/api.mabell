import { AdminRoles } from '../constants/admin-roles';
import { AdminRole, AdminRoleLabel } from '../types';

export function getAdminRoleLabelByValue(value: AdminRole): AdminRoleLabel {
  return (Object.keys(AdminRoles) as AdminRoleLabel[]).find(
    (key) => AdminRoles[key] === value,
  ) as AdminRoleLabel;
}
