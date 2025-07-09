import { CommandHandler } from '@core/app/types';
import { AdminService } from '@core/app/components/admin/services/admin.service';
import { UpdateAdminCommand } from '@core/app/cqrs/admin/commands/update-admin/update-admin.command';

export class UpdateAdminHandler implements CommandHandler<UpdateAdminCommand> {
  constructor(private _adminService: AdminService) {}

  async execute({ id, payload }: UpdateAdminCommand) {
    return await this._adminService.updateAdmin(id, payload);
  }
}
