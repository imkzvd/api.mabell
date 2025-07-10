import { CommandHandler } from '@core/app/types';
import { DeleteAdminRefreshTokenCommand } from '@core/app/cqrs/token/commands/delete-admin-refresh-token/delete-admin-refresh-token.command';
import { AdminTokenDeleteService } from '@core/app/components/admin-token/services/admin-token-delete.service';

export class DeleteAdminRefreshTokenHandler
  implements CommandHandler<DeleteAdminRefreshTokenCommand>
{
  constructor(private readonly _service: AdminTokenDeleteService) {}

  async execute({ token }: DeleteAdminRefreshTokenCommand) {
    await this._service.deleteRefreshToken(token);
  }
}
