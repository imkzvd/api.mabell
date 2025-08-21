import { CommandHandler } from '../../../../types';
import { UpdateAdminUsernameCommand } from './update-admin-username.command';
import { AdminUpdateService } from '../../../../components/admin';

export class UpdateAdminUsernameHandler implements CommandHandler<UpdateAdminUsernameCommand> {
  constructor(private _service: AdminUpdateService) {}

  async execute({ id, username }: UpdateAdminUsernameCommand) {
    await this._service.updateUsernameById(id, username);
  }
}
