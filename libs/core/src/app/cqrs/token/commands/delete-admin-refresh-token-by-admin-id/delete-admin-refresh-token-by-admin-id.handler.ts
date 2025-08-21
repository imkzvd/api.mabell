import { CommandHandler } from '../../../../types';
import { DeleteAdminRefreshTokenByAdminIdCommand } from './delete-admin-refresh-token-by-admin-id.command';
import { AdminTokenDeleteService } from '../../../../components/admin-token';

export class DeleteAdminRefreshTokenByAdminIdHandler
  implements CommandHandler<DeleteAdminRefreshTokenByAdminIdCommand>
{
  constructor(private readonly _service: AdminTokenDeleteService) {}

  async execute({ adminId }: DeleteAdminRefreshTokenByAdminIdCommand) {
    await this._service.deleteRefreshTokensByAdminId(adminId);
  }
}
