import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateAdminRefreshTokenCommand } from './create-admin-refresh-token.command';
import { TokenService } from '../../../../components/token/token.service';
import { AdminService } from '../../../../components/admin/admin.service';
import { UnauthorizedException } from '../../../../../shared/exceptions';

@CommandHandler(CreateAdminRefreshTokenCommand)
export class CreateAdminRefreshTokenHandler
  implements ICommandHandler<CreateAdminRefreshTokenCommand>
{
  constructor(
    @Inject(AdminService) private readonly _adminService: AdminService,
    @Inject(TokenService) private readonly _tokenService: TokenService,
  ) {}

  async execute({ payload }: CreateAdminRefreshTokenCommand) {
    const foundAdmin = await this._adminService.getAdmin(payload.adminId);

    if (!foundAdmin) {
      throw new UnauthorizedException();
    }

    return this._tokenService.createAdminRefreshToken({
      adminId: foundAdmin.id,
      userAgent: payload.userAgent,
      ip: payload.ip,
    });
  }
}
