import { CommandHandler } from '@core/app/types';
import { DeleteAdminRefreshTokenByIdCommand } from '@core/app/cqrs/token/commands/delete-admin-refresh-token-by-id/delete-admin-refresh-token-by-id.command';
import { AdminTokenDeleteService } from '@core/app/components/admin-token/services/admin-token-delete.service';

export class DeleteAdminRefreshTokenByIdHandler
  implements CommandHandler<DeleteAdminRefreshTokenByIdCommand>
{
  constructor(private readonly _service: AdminTokenDeleteService) {}

  async execute({ id }: DeleteAdminRefreshTokenByIdCommand) {
    await this._service.deleteRefreshTokenById(id);
  }
}
