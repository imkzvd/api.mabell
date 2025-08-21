import { CommandHandler } from '../../../../types';
import { DeleteAdminRefreshTokenCommand } from './delete-admin-refresh-token.command';
import { AdminTokenDeleteService } from '../../../../components/admin-token';

export class DeleteAdminRefreshTokenHandler
  implements CommandHandler<DeleteAdminRefreshTokenCommand>
{
  constructor(private readonly _service: AdminTokenDeleteService) {}

  async execute({ token }: DeleteAdminRefreshTokenCommand) {
    await this._service.deleteRefreshTokenByToken(token);
  }
}
