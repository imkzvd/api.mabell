import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteAdminCommand } from './delete-admin.command';
import { AdminService } from '../../../../components/admin/admin.service';

@CommandHandler(DeleteAdminCommand)
export class DeleteAdminHandler implements ICommandHandler<DeleteAdminCommand> {
  constructor(@Inject(AdminService) private readonly _adminService: AdminService) {}

  async execute({ id }: DeleteAdminCommand) {
    return await this._adminService.deleteAdmin(id);
  }
}
