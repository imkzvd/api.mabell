import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteAdminRefreshTokenCommand } from './delete-admin-refresh-token.command';
import { AdminTokenService } from '../../../../components/admin-token/admin-token.service';

@CommandHandler(DeleteAdminRefreshTokenCommand)
export class DeleteAdminRefreshTokenHandler
  implements ICommandHandler<DeleteAdminRefreshTokenCommand>
{
  constructor(@Inject(AdminTokenService) private readonly _adminTokenService: AdminTokenService) {}

  async execute({ token }: DeleteAdminRefreshTokenCommand) {
    await this._adminTokenService.deleteRefreshToken(token);
  }
}
