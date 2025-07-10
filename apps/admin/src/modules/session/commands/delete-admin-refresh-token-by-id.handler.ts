import { CommandHandler } from '@nestjs/cqrs';
import { DeleteAdminRefreshTokenByIdCommand } from '@core/app/cqrs/token/commands/delete-admin-refresh-token-by-id/delete-admin-refresh-token-by-id.command';
import { DeleteAdminRefreshTokenByIdHandler as CoreDeleteAdminRefreshTokenByIdHandler } from '@core/app/cqrs/token/commands/delete-admin-refresh-token-by-id/delete-admin-refresh-token-by-id.handler';
import { AdminTokenDeleteService } from '@core/app/components/admin-token/services/admin-token-delete.service';

@CommandHandler(DeleteAdminRefreshTokenByIdCommand)
export class DeleteAdminRefreshTokenByIdHandler extends CoreDeleteAdminRefreshTokenByIdHandler {
  constructor(readonly service: AdminTokenDeleteService) {
    super(service);
  }
}
