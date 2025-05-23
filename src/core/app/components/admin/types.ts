import { AdminRole } from '../../../domain/components/admin/constants/admin-roles';

export type UpdateAdminPayload = Partial<{
  name: string;
  role: AdminRole;
  isBlocked: boolean;
}>;
