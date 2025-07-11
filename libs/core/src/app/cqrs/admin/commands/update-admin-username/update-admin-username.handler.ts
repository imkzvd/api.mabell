import { CommandHandler } from '@core/app/types';
import { AdminUpdateService } from '@core/app/components/admin/services/admin-update.service';
import { UpdateAdminUsernameCommand } from '@core/app/cqrs/admin/commands/update-admin-username/update-admin-username.command';

export class UpdateAdminUsernameHandler implements CommandHandler<UpdateAdminUsernameCommand> {
  constructor(private _service: AdminUpdateService) {}

  async execute({ id, username }: UpdateAdminUsernameCommand) {
    return await this._service.updateUsername(id, username);
  }
}
