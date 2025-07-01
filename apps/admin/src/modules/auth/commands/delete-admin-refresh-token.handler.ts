import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AdminTokenService } from '@core/app/components/admin-token/admin-token.service';
import { DeleteAdminRefreshTokenCommand } from '@core/app/cqrs/token/commands/delete-admin-refresh-token/delete-admin-refresh-token.command';
import { DeleteAdminRefreshTokenHandler as CoreDeleteAdminRefreshTokenHandler } from '@core/app/cqrs/token/commands/delete-admin-refresh-token/delete-admin-refresh-token.handler';

@CommandHandler(DeleteAdminRefreshTokenCommand)
export class DeleteAdminRefreshTokenHandler
  implements ICommandHandler<DeleteAdminRefreshTokenCommand>
{
  private readonly _coreHandler: CoreDeleteAdminRefreshTokenHandler;

  constructor(@Inject(AdminTokenService) service: AdminTokenService) {
    this._coreHandler = new CoreDeleteAdminRefreshTokenHandler(service);
  }

  execute(command: DeleteAdminRefreshTokenCommand) {
    return this._coreHandler.execute(command);
  }
}
