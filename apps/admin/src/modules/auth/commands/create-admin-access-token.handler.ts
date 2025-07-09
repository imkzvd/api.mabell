import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateAdminAccessTokenHandler as CoreCreateAdminAccessTokenHandler } from '@core/app/cqrs/token/commands/create-admin-access-token/create-admin-access-token.handler';
import { CreateAdminAccessTokenCommand } from '@core/app/cqrs/token/commands/create-admin-access-token/create-admin-access-token.command';
import { AdminService } from '@core/app/components/admin/services/admin.service';
import { AdminTokenService } from '@core/app/components/admin-token/admin-token.service';

@CommandHandler(CreateAdminAccessTokenCommand)
export class CreateAdminAccessTokenHandler extends CoreCreateAdminAccessTokenHandler {
  constructor(
    @Inject(AdminService) adminService: AdminService,
    @Inject(AdminTokenService) adminTokenService: AdminTokenService,
  ) {
    super(adminService, adminTokenService);
  }
}
