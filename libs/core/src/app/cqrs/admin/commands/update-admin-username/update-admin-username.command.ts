import { Command } from '@core/app/types';
import { AdminId } from '@core/domain/components/admin/types';

export class UpdateAdminUsernameCommand extends Command<AdminId> {
  constructor(
    public readonly id: string,
    public readonly username: string,
  ) {
    super();
  }
}
