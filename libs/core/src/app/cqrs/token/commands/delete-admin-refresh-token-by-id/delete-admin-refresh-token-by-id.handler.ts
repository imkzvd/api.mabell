import { CommandHandler } from '../../../../types';
import { DeleteAdminRefreshTokenByIdCommand } from './delete-admin-refresh-token-by-id.command';
import { AdminTokenDeleteService } from '../../../../components/admin-token';

export class DeleteAdminRefreshTokenByIdHandler
  implements CommandHandler<DeleteAdminRefreshTokenByIdCommand>
{
  constructor(private readonly _service: AdminTokenDeleteService) {}

  async execute({ id }: DeleteAdminRefreshTokenByIdCommand) {
    await this._service.deleteRefreshTokenById(id);
  }
}
