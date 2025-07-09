import { CommandHandler } from '@core/app/types';
import { AdminUpdateService } from '@core/app/components/admin/services/admin-update.service';
import { RefreshAdminPasswordCommand } from '@core/app/cqrs/admin/commands/refresh-admin-password/refresh-admin-password.command';

export class RefreshAdminPasswordHandler implements CommandHandler<RefreshAdminPasswordCommand> {
  constructor(private readonly _service: AdminUpdateService) {}

  async execute({ id }: RefreshAdminPasswordCommand) {
    return await this._service.refreshPassword(id);
  }
}
