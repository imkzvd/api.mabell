import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AdminService } from '@core/app/components/admin/admin.service';
import { AdminTokenService } from '@core/app/components/admin-token/admin-token.service';
import { CreateAdminRefreshTokenCommand } from '@core/app/cqrs/token/commands/create-admin-refresh-token/create-admin-refresh-token.command';
import { CreateAdminRefreshTokenHandler as CoreCreateAdminRefreshTokenHandler } from '@core/app/cqrs/token/commands/create-admin-refresh-token/create-admin-refresh-token.handler';

@CommandHandler(CreateAdminRefreshTokenCommand)
export class CreateAdminRefreshTokenHandler
  implements ICommandHandler<CreateAdminRefreshTokenCommand>
{
  private readonly _coreHandler: CoreCreateAdminRefreshTokenHandler;

  constructor(
    @Inject(AdminService) adminService: AdminService,
    @Inject(AdminTokenService) adminTokenService: AdminTokenService,
  ) {
    this._coreHandler = new CoreCreateAdminRefreshTokenHandler(adminService, adminTokenService);
  }

  execute(command: CreateAdminRefreshTokenCommand) {
    return this._coreHandler.execute(command);
  }
}
