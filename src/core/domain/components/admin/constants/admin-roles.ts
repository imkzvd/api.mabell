export const AdminRoles = {
  Owner: 'OWN',
  Admin: 'ADM',
  Guest: 'GST',
} as const;

export type AdminRoleLabel = keyof typeof AdminRoles;

export type AdminRole = (typeof AdminRoles)[AdminRoleLabel];

export function getAdminRoleLabelByValue(value: AdminRole): AdminRoleLabel | undefined {
  return (Object.keys(AdminRoles) as AdminRoleLabel[]).find((key) => AdminRoles[key] === value);
}
