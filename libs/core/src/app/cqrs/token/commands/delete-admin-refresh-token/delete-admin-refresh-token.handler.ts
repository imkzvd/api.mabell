import { CommandHandler } from '@core/app/types';
import { AdminTokenService } from '@core/app/components/admin-token/admin-token.service';
import { DeleteAdminRefreshTokenCommand } from '@core/app/cqrs/token/commands/delete-admin-refresh-token/delete-admin-refresh-token.command';

export class DeleteAdminRefreshTokenHandler
  implements CommandHandler<DeleteAdminRefreshTokenCommand>
{
  constructor(private readonly _adminTokenService: AdminTokenService) {}

  async execute({ token }: DeleteAdminRefreshTokenCommand) {
    await this._adminTokenService.deleteRefreshToken(token);
  }
}
