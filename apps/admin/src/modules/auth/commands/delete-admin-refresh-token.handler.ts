import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AdminTokenService } from '@core/app/components/admin-token/admin-token.service';
import { DeleteAdminRefreshTokenCommand } from '@core/app/cqrs/token/commands/delete-admin-refresh-token/delete-admin-refresh-token.command';
import { DeleteAdminRefreshTokenHandler as CoreDeleteAdminRefreshTokenHandler } from '@core/app/cqrs/token/commands/delete-admin-refresh-token/delete-admin-refresh-token.handler';

@CommandHandler(DeleteAdminRefreshTokenCommand)
export class DeleteAdminRefreshTokenHandler extends CoreDeleteAdminRefreshTokenHandler {
  constructor(@Inject(AdminTokenService) service: AdminTokenService) {
    super(service);
  }
}
