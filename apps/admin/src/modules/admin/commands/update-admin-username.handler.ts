import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AdminService } from '@core/app/components/admin/admin.service';
import { UpdateAdminUsernameCommand } from '@core/app/cqrs/admin/commands/update-admin-username/update-admin-username.command';
import { UpdateAdminUsernameHandler as CoreUpdateAdminUsernameHandler } from '@core/app/cqrs/admin/commands/update-admin-username/update-admin-username.handler';

@CommandHandler(UpdateAdminUsernameCommand)
export class UpdateAdminUsernameHandler implements ICommandHandler<UpdateAdminUsernameCommand> {
  private readonly _coreHandler: CoreUpdateAdminUsernameHandler;

  constructor(@Inject(AdminService) service: AdminService) {
    this._coreHandler = new CoreUpdateAdminUsernameHandler(service);
  }

  execute(command: UpdateAdminUsernameCommand) {
    return this._coreHandler.execute(command);
  }
}
