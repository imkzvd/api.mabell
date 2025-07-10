import { CommandHandler } from '@core/app/types';
import { UnauthorizedException } from '@core/shared/exceptions';
import { CreateAdminRefreshTokenCommand } from '@core/app/cqrs/token/commands/create-admin-refresh-token/create-admin-refresh-token.command';
import { AdminService } from '@core/app/components/admin/services/admin.service';
import { AdminTokenCreateService } from '@core/app/components/admin-token/services/admin-token-create.service';

export class CreateAdminRefreshTokenHandler
  implements CommandHandler<CreateAdminRefreshTokenCommand>
{
  constructor(
    private readonly _adminService: AdminService,
    private readonly _adminTokenCreateService: AdminTokenCreateService,
  ) {}

  async execute({ payload }: CreateAdminRefreshTokenCommand) {
    const foundAdmin = await this._adminService.find(payload.adminId);

    if (!foundAdmin) {
      throw new UnauthorizedException();
    }

    return this._adminTokenCreateService.createRefreshToken({
      adminId: foundAdmin.id,
      role: foundAdmin.role,
      userAgent: payload.userAgent,
      ip: payload.ip,
    });
  }
}
