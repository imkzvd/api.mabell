import { CommandHandler } from '@core/app/types';
import { AdminTokenService } from '@core/app/components/admin-token/admin-token.service';
import { AdminService } from '@core/app/components/admin/admin.service';
import { UnauthorizedException } from '@core/shared/exceptions';
import { CreateAdminRefreshTokenCommand } from '@core/app/cqrs/token/commands/create-admin-refresh-token/create-admin-refresh-token.command';

export class CreateAdminRefreshTokenHandler
  implements CommandHandler<CreateAdminRefreshTokenCommand>
{
  constructor(
    private readonly _adminService: AdminService,
    private readonly _adminTokenService: AdminTokenService,
  ) {}

  async execute({ payload }: CreateAdminRefreshTokenCommand) {
    const foundAdmin = await this._adminService.getAdmin(payload.adminId);

    if (!foundAdmin) {
      throw new UnauthorizedException();
    }

    return this._adminTokenService.createRefreshToken({
      adminId: foundAdmin.id,
      role: foundAdmin.role,
      userAgent: payload.userAgent,
      ip: payload.ip,
    });
  }
}
