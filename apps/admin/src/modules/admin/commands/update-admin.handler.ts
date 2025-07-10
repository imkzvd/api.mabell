import { CommandHandler } from '@nestjs/cqrs';
import { AdminUpdateService } from '@core/app/components/admin/services/admin-update.service';
import { UpdateAdminCommand } from '@core/app/cqrs/admin/commands/update-admin/update-admin.command';
import { UpdateAdminHandler as CoreUpdateAdminHandler } from '@core/app/cqrs/admin/commands/update-admin/update-admin.handler';

@CommandHandler(UpdateAdminCommand)
export class UpdateAdminHandler extends CoreUpdateAdminHandler {
  constructor(service: AdminUpdateService) {
    super(service);
  }
}
