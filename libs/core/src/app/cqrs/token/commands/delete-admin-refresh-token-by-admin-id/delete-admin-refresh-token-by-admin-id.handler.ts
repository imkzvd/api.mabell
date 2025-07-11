import { CommandHandler } from '@core/app/types';
import { DeleteAdminRefreshTokenByAdminIdCommand } from '@core/app/cqrs/token/commands/delete-admin-refresh-token-by-admin-id/delete-admin-refresh-token-by-admin-id.command';
import { AdminTokenDeleteService } from '@core/app/components/admin-token/services/admin-token-delete.service';

export class DeleteAdminRefreshTokenByAdminIdHandler
  implements CommandHandler<DeleteAdminRefreshTokenByAdminIdCommand>
{
  constructor(private readonly _service: AdminTokenDeleteService) {}

  async execute({ adminId }: DeleteAdminRefreshTokenByAdminIdCommand) {
    await this._service.deleteRefreshTokensByAdminId(adminId);
  }
}
