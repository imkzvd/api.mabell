import { CommandHandler } from '../../../../types';
import { CreateAdminRefreshTokenCommand } from './create-admin-refresh-token.command';
import { AdminService } from '../../../../components/admin';
import { AdminTokenCreateService } from '../../../../components/admin-token';
import { UnauthorizedException } from '../../../../../shared/exceptions';

export class CreateAdminRefreshTokenHandler
  implements CommandHandler<CreateAdminRefreshTokenCommand>
{
  constructor(
    private readonly _adminService: AdminService,
    private readonly _adminTokenCreateService: AdminTokenCreateService,
  ) {}

  async execute({ payload }: CreateAdminRefreshTokenCommand) {
    const foundAdmin = await this._adminService.findById(payload.adminId);

    if (!foundAdmin) {
      throw new UnauthorizedException();
    }

    const token = await this._adminTokenCreateService.createRefreshToken({
      adminId: foundAdmin.id,
      role: foundAdmin.role,
      userAgent: payload.userAgent,
      ip: payload.ip,
    });

    return { token };
  }
}
