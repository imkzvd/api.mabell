import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AdminService } from '@core/app/components/admin/admin.service';
import { DeleteAdminCommand } from '@core/app/cqrs/admin/commands/delete-admin/delete-admin.command';
import { DeleteAdminHandler as CoreDeleteAdminHandler } from '@core/app/cqrs/admin/commands/delete-admin/delete-admin.handler';

@CommandHandler(DeleteAdminCommand)
export class DeleteAdminHandler implements ICommandHandler<DeleteAdminCommand> {
  private readonly _coreHandler: CoreDeleteAdminHandler;

  constructor(@Inject(AdminService) service: AdminService) {
    this._coreHandler = new CoreDeleteAdminHandler(service);
  }

  execute(command: DeleteAdminCommand) {
    return this._coreHandler.execute(command);
  }
}
