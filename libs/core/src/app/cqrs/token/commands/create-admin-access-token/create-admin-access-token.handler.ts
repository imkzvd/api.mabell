import { CommandHandler } from '@core/app/types';
import { AdminTokenService } from '@core/app/components/admin-token/admin-token.service';
import { AdminFindService } from '@core/app/components/admin/services/admin-find.service';
import { UnauthorizedException } from '@core/shared/exceptions';
import { CreateAdminAccessTokenCommand } from '@core/app/cqrs/token/commands/create-admin-access-token/create-admin-access-token.command';

export class CreateAdminAccessTokenHandler
  implements CommandHandler<CreateAdminAccessTokenCommand>
{
  constructor(
    private readonly _adminService: AdminFindService,
    private readonly _adminTokenService: AdminTokenService,
  ) {}

  async execute({ adminId }: CreateAdminAccessTokenCommand) {
    const foundAdmin = await this._adminService.find(adminId);

    if (!foundAdmin) {
      throw new UnauthorizedException();
    }

    return this._adminTokenService.createAccessToken({
      adminId: foundAdmin.id,
      role: foundAdmin.role,
    });
  }
}
