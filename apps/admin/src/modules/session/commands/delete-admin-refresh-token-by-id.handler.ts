import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { AdminTokenService } from '@core/app/components/admin-token/admin-token.service';
import { DeleteAdminRefreshTokenByIdCommand } from '@core/app/cqrs/token/commands/delete-admin-refresh-token-by-id/delete-admin-refresh-token-by-id.command';
import { DeleteAdminRefreshTokenByIdHandler as CoreDeleteAdminRefreshTokenByIdHandler } from '@core/app/cqrs/token/commands/delete-admin-refresh-token-by-id/delete-admin-refresh-token-by-id.handler';

@CommandHandler(DeleteAdminRefreshTokenByIdCommand)
export class DeleteAdminRefreshTokenByIdHandler extends CoreDeleteAdminRefreshTokenByIdHandler {
  constructor(@Inject(AdminTokenService) readonly service: AdminTokenService) {
    super(service);
  }
}
