import { CommandHandler } from '@nestjs/cqrs';
import { AdminUpdateService } from '@core/app/components/admin/services/admin-update.service';
import { UpdateAdminUsernameCommand } from '@core/app/cqrs/admin/commands/update-admin-username/update-admin-username.command';
import { UpdateAdminUsernameHandler as CoreUpdateAdminUsernameHandler } from '@core/app/cqrs/admin/commands/update-admin-username/update-admin-username.handler';

@CommandHandler(UpdateAdminUsernameCommand)
export class UpdateAdminUsernameHandler extends CoreUpdateAdminUsernameHandler {
  constructor(service: AdminUpdateService) {
    super(service);
  }
}
