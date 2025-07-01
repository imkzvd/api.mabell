import { CommandHandler } from '@core/app/types';
import { AdminTokenService } from '@core/app/components/admin-token/admin-token.service';
import { DeleteAdminRefreshTokenByIdCommand } from '@core/app/cqrs/token/commands/delete-admin-refresh-token-by-id/delete-admin-refresh-token-by-id.command';

export class DeleteAdminRefreshTokenByIdHandler
  implements CommandHandler<DeleteAdminRefreshTokenByIdCommand>
{
  constructor(private readonly _adminTokenService: AdminTokenService) {}

  async execute({ id }: DeleteAdminRefreshTokenByIdCommand) {
    await this._adminTokenService.deleteRefreshTokenById(id);
  }
}
