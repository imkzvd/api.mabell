import { CommandHandler } from '@nestjs/cqrs';
import { AdminUpdateService } from '@core/app/components/admin/services/admin-update.service';
import { RefreshAdminPasswordHandler as CoreRefreshAdminPasswordHandler } from '@core/app/cqrs/admin/commands/refresh-admin-password/refresh-admin-password.handler';
import { RefreshAdminPasswordCommand } from '@core/app/cqrs/admin/commands/refresh-admin-password/refresh-admin-password.command';

@CommandHandler(RefreshAdminPasswordCommand)
export class RefreshAdminPasswordHandler extends CoreRefreshAdminPasswordHandler {
  constructor(service: AdminUpdateService) {
    super(service);
  }
}
