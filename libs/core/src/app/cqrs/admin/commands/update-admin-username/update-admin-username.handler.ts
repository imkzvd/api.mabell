import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateAdminUsernameCommand } from './update-admin-username.command';
import { AdminService } from '../../../../components/admin/admin.service';

@CommandHandler(UpdateAdminUsernameCommand)
export class UpdateAdminUsernameHandler implements ICommandHandler<UpdateAdminUsernameCommand> {
  constructor(@Inject(AdminService) private _adminService: AdminService) {}

  async execute({ id, username }: UpdateAdminUsernameCommand) {
    return await this._adminService.updateAdminUsername(id, username);
  }
}
