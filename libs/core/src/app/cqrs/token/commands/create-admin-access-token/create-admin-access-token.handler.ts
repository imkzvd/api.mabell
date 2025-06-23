import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateAdminAccessTokenCommand } from './create-admin-access-token.command';
import { AdminTokenService } from '../../../../components/admin-token/admin-token.service';
import { AdminService } from '../../../../components/admin/admin.service';
import { UnauthorizedException } from '../../../../../shared/exceptions';

@CommandHandler(CreateAdminAccessTokenCommand)
export class CreateAdminAccessTokenHandler
  implements ICommandHandler<CreateAdminAccessTokenCommand>
{
  constructor(
    @Inject(AdminService) private readonly _adminService: AdminService,
    @Inject(AdminTokenService) private readonly _adminTokenService: AdminTokenService,
  ) {}

  async execute({ adminId }: CreateAdminAccessTokenCommand) {
    const foundAdmin = await this._adminService.getAdmin(adminId);

    if (!foundAdmin) {
      throw new UnauthorizedException();
    }

    return this._adminTokenService.createAccessToken({
      adminId: foundAdmin.id,
      role: foundAdmin.role,
    });
  }
}
