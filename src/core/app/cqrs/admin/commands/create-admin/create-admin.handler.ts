import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateAdminCommand } from './create-admin.command';
import { AdminService } from '../../../../components/admin/admin.service';

@CommandHandler(CreateAdminCommand)
export class CreateAdminHandler implements ICommandHandler<CreateAdminCommand> {
  constructor(@Inject(AdminService) private readonly _adminService: AdminService) {}

  async execute() {
    return await this._adminService.createAdmin();
  }
}
