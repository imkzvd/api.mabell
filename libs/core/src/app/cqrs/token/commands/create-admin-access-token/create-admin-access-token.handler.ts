import { CommandHandler } from '@core/app/types';
import { UnauthorizedException } from '@core/shared/exceptions';
import { CreateAdminAccessTokenCommand } from '@core/app/cqrs/token/commands/create-admin-access-token/create-admin-access-token.command';
import { AdminService } from '@core/app/components/admin/services/admin.service';
import { AdminTokenCreateService } from '@core/app/components/admin-token/services/admin-token-create.service';

export class CreateAdminAccessTokenHandler
  implements CommandHandler<CreateAdminAccessTokenCommand>
{
  constructor(
    private readonly _adminService: AdminService,
    private readonly _adminTokenCreateService: AdminTokenCreateService,
  ) {}

  async execute({ adminId }: CreateAdminAccessTokenCommand) {
    const foundAdmin = await this._adminService.find(adminId);

    if (!foundAdmin) {
      throw new UnauthorizedException();
    }

    return this._adminTokenCreateService.createAccessToken({
      adminId: foundAdmin.id,
      role: foundAdmin.role,
    });
  }
}
