import { CommandHandler } from '@nestjs/cqrs';
import { CreateAdminRefreshTokenCommand } from '@core/app/cqrs/token/commands/create-admin-refresh-token/create-admin-refresh-token.command';
import { CreateAdminRefreshTokenHandler as CoreCreateAdminRefreshTokenHandler } from '@core/app/cqrs/token/commands/create-admin-refresh-token/create-admin-refresh-token.handler';
import { AdminService } from '@core/app/components/admin/services/admin.service';
import { AdminTokenCreateService } from '@core/app/components/admin-token/services/admin-token-create.service';

@CommandHandler(CreateAdminRefreshTokenCommand)
export class CreateAdminRefreshTokenHandler extends CoreCreateAdminRefreshTokenHandler {
  constructor(adminService: AdminService, adminTokenCreateService: AdminTokenCreateService) {
    super(adminService, adminTokenCreateService);
  }
}
