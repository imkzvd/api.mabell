import { CommandHandler } from '@core/app/types';
import { AdminService } from '@core/app/components/admin/services/admin.service';
import { DeleteAdminCommand } from '@core/app/cqrs/admin/commands/delete-admin/delete-admin.command';

export class DeleteAdminHandler implements CommandHandler<DeleteAdminCommand> {
  constructor(private readonly _adminService: AdminService) {}

  async execute({ id }: DeleteAdminCommand) {
    return await this._adminService.deleteAdmin(id);
  }
}
