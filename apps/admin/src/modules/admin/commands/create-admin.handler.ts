import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AdminService } from '@core/app/components/admin/admin.service';
import { CreateAdminCommand } from '@core/app/cqrs/admin/commands/create-admin/create-admin.command';
import { CreateAdminHandler as CoreCreateAdminHandler } from '@core/app/cqrs/admin/commands/create-admin/create-admin.handler';

@CommandHandler(CreateAdminCommand)
export class CreateAdminHandler implements ICommandHandler<CreateAdminCommand> {
  private readonly _coreHandler: CoreCreateAdminHandler;

  constructor(@Inject(AdminService) readonly service: AdminService) {
    this._coreHandler = new CoreCreateAdminHandler(service);
  }

  execute() {
    return this._coreHandler.execute();
  }
}
