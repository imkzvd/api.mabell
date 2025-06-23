import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateAdminCommand } from './update-admin.command';
import { AdminService } from '../../../../components/admin/admin.service';

@CommandHandler(UpdateAdminCommand)
export class UpdateAdminHandler implements ICommandHandler<UpdateAdminCommand> {
  constructor(@Inject(AdminService) private _adminService: AdminService) {}

  async execute({ id, payload }: UpdateAdminCommand) {
    return await this._adminService.updateAdmin(id, payload);
  }
}
