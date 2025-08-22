import { AdminRole } from '../../../domain/components/admin/types';

export type UpdateAdminPayload = Partial<{
  name: string;
  role: AdminRole;
  isBlocked: boolean;
}>;

export type LoginAdminPayload = {
  username: string;
  password: string;
};
