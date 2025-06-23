import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RefreshAdminPasswordCommand } from './refresh-admin-password.command';
import { AdminService } from '../../../../components/admin/admin.service';

@CommandHandler(RefreshAdminPasswordCommand)
export class RefreshAdminPasswordHandler implements ICommandHandler<RefreshAdminPasswordCommand> {
  constructor(@Inject(AdminService) private readonly _adminService: AdminService) {}

  async execute({ id }: RefreshAdminPasswordCommand) {
    return await this._adminService.refreshAdminPassword(id);
  }
}
