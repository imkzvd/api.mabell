import { CommandHandler } from '@core/app/types';
import { AdminTokenService } from '@core/app/components/admin-token/admin-token.service';
import { DeleteAdminRefreshTokenByAdminIdCommand } from '@core/app/cqrs/token/commands/delete-admin-refresh-token-by-admin-id/delete-admin-refresh-token-by-admin-id.command';

export class DeleteAdminRefreshTokenByAdminIdHandler
  implements CommandHandler<DeleteAdminRefreshTokenByAdminIdCommand>
{
  constructor(private readonly _adminTokenService: AdminTokenService) {}

  async execute({ adminId }: DeleteAdminRefreshTokenByAdminIdCommand) {
    await this._adminTokenService.deleteRefreshTokensByAdminId(adminId);
  }
}
