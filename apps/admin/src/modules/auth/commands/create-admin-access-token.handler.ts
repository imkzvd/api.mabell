import { CommandHandler } from '@nestjs/cqrs';
import { CreateAdminAccessTokenHandler as CoreCreateAdminAccessTokenHandler } from '@core/app/cqrs/token/commands/create-admin-access-token/create-admin-access-token.handler';
import { CreateAdminAccessTokenCommand } from '@core/app/cqrs/token/commands/create-admin-access-token/create-admin-access-token.command';
import { AdminService } from '@core/app/components/admin/services/admin.service';
import { AdminTokenCreateService } from '@core/app/components/admin-token/services/admin-token-create.service';

@CommandHandler(CreateAdminAccessTokenCommand)
export class CreateAdminAccessTokenHandler extends CoreCreateAdminAccessTokenHandler {
  constructor(adminService: AdminService, adminTokenCreateService: AdminTokenCreateService) {
    super(adminService, adminTokenCreateService);
  }
}
