import { CommandHandler } from '@core/app/types';
import { AdminService } from '@core/app/components/admin/admin.service';
import { CreateAdminCommand } from '@core/app/cqrs/admin/commands/create-admin/create-admin.command';

export class CreateAdminHandler implements CommandHandler<CreateAdminCommand> {
  constructor(private readonly _adminService: AdminService) {}

  async execute() {
    return await this._adminService.createAdmin();
  }
}
