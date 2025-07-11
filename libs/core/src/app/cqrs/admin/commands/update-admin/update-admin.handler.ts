import { CommandHandler } from '@core/app/types';
import { AdminUpdateService } from '@core/app/components/admin/services/admin-update.service';
import { UpdateAdminCommand } from '@core/app/cqrs/admin/commands/update-admin/update-admin.command';

export class UpdateAdminHandler implements CommandHandler<UpdateAdminCommand> {
  constructor(private _service: AdminUpdateService) {}

  async execute({ id, payload }: UpdateAdminCommand) {
    return await this._service.update(id, payload);
  }
}
