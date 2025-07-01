import { CommandHandler } from '@core/app/types';
import { AdminService } from '@core/app/components/admin/admin.service';
import { RefreshAdminPasswordCommand } from '@core/app/cqrs/admin/commands/refresh-admin-password/refresh-admin-password.command';

export class RefreshAdminPasswordHandler implements CommandHandler<RefreshAdminPasswordCommand> {
  constructor(private readonly _adminService: AdminService) {}

  async execute({ id }: RefreshAdminPasswordCommand) {
    return await this._adminService.refreshAdminPassword(id);
  }
}
