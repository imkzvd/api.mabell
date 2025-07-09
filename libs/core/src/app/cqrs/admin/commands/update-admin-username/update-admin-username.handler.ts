import { AdminService } from '@core/app/components/admin/services/admin.service';
import { CommandHandler } from '@core/app/types';
import { UpdateAdminUsernameCommand } from '@core/app/cqrs/admin/commands/update-admin-username/update-admin-username.command';

export class UpdateAdminUsernameHandler implements CommandHandler<UpdateAdminUsernameCommand> {
  constructor(private _adminService: AdminService) {}

  async execute({ id, username }: UpdateAdminUsernameCommand) {
    return await this._adminService.updateAdminUsername(id, username);
  }
}
