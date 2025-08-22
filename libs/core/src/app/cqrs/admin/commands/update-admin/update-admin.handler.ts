import { CommandHandler } from '../../../../types';
import { UpdateAdminCommand } from './update-admin.command';
import { AdminUpdateService } from '../../../../components/admin';

export class UpdateAdminHandler implements CommandHandler<UpdateAdminCommand> {
  constructor(private _service: AdminUpdateService) {}

  async execute({ id, payload }: UpdateAdminCommand) {
    await this._service.updateById(id, payload);
  }
}
