import { Command } from '@nestjs/cqrs';
import { AdminRole } from '../../../../../domain/components/admin/constants/admin-roles';

export class UpdateAdminCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: Partial<{
      name: string;
      role: AdminRole;
      isBlocked: boolean;
    }>,
  ) {
    super();
  }
}
