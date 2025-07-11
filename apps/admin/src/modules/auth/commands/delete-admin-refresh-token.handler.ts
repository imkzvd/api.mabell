import { CommandHandler } from '@nestjs/cqrs';
import { DeleteAdminRefreshTokenCommand } from '@core/app/cqrs/token/commands/delete-admin-refresh-token/delete-admin-refresh-token.command';
import { DeleteAdminRefreshTokenHandler as CoreDeleteAdminRefreshTokenHandler } from '@core/app/cqrs/token/commands/delete-admin-refresh-token/delete-admin-refresh-token.handler';
import { AdminTokenDeleteService } from '@core/app/components/admin-token/services/admin-token-delete.service';

@CommandHandler(DeleteAdminRefreshTokenCommand)
export class DeleteAdminRefreshTokenHandler extends CoreDeleteAdminRefreshTokenHandler {
  constructor(service: AdminTokenDeleteService) {
    super(service);
  }
}
