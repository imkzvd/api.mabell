import { AdminRole } from '@core/domain/components/admin/constants/admin-roles';

export type UpdateAdminPayload = Partial<{
  name: string;
  role: AdminRole;
  isBlocked: boolean;
}>;

export type LoginAdminPayload = {
  username: string;
  password: string;
};
