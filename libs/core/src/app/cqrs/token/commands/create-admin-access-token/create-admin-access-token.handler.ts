import { CreateAdminAccessTokenCommand } from './create-admin-access-token.command';
import { CommandHandler } from '../../../../types';
import { AdminService } from '../../../../components/admin';
import { AdminTokenCreateService } from '../../../../components/admin-token';
import { UnauthorizedException } from '../../../../../shared/exceptions';

export class CreateAdminAccessTokenHandler
  implements CommandHandler<CreateAdminAccessTokenCommand>
{
  constructor(
    private readonly _adminService: AdminService,
    private readonly _adminTokenCreateService: AdminTokenCreateService,
  ) {}

  async execute({ adminId }: CreateAdminAccessTokenCommand) {
    const foundAdmin = await this._adminService.findById(adminId);

    if (!foundAdmin) {
      throw new UnauthorizedException();
    }

    const token = this._adminTokenCreateService.createAccessToken({
      adminId: foundAdmin.id,
      role: foundAdmin.role,
    });

    return { token };
  }
}
