import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AdminService } from '@core/app/components/admin/admin.service';
import { RefreshAdminPasswordHandler as CoreRefreshAdminPasswordHandler } from '@core/app/cqrs/admin/commands/refresh-admin-password/refresh-admin-password.handler';
import { RefreshAdminPasswordCommand } from '@core/app/cqrs/admin/commands/refresh-admin-password/refresh-admin-password.command';

@CommandHandler(RefreshAdminPasswordCommand)
export class RefreshAdminPasswordHandler implements ICommandHandler<RefreshAdminPasswordCommand> {
  private readonly _coreHandler: CoreRefreshAdminPasswordHandler;

  constructor(@Inject(AdminService) service: AdminService) {
    this._coreHandler = new CoreRefreshAdminPasswordHandler(service);
  }

  execute(command: RefreshAdminPasswordCommand) {
    return this._coreHandler.execute(command);
  }
}
