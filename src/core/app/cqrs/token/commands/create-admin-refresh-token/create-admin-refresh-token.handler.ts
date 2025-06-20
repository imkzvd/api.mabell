import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateAdminRefreshTokenCommand } from './create-admin-refresh-token.command';
import { AdminTokenService } from '../../../../components/admin-token/admin-token.service';
import { AdminService } from '../../../../components/admin/admin.service';
import { UnauthorizedException } from '../../../../../shared/exceptions';

@CommandHandler(CreateAdminRefreshTokenCommand)
export class CreateAdminRefreshTokenHandler
  implements ICommandHandler<CreateAdminRefreshTokenCommand>
{
  constructor(
    @Inject(AdminService) private readonly _adminService: AdminService,
    @Inject(AdminTokenService) private readonly _adminTokenService: AdminTokenService,
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
