import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AdminService } from '@core/app/components/admin/admin.service';
import { UpdateAdminCommand } from '@core/app/cqrs/admin/commands/update-admin/update-admin.command';
import { UpdateAdminHandler as CoreUpdateAdminHandler } from '@core/app/cqrs/admin/commands/update-admin/update-admin.handler';

@CommandHandler(UpdateAdminCommand)
export class UpdateAdminHandler extends CoreUpdateAdminHandler {
  constructor(@Inject(AdminService) service: AdminService) {
    super(service);
  }
}
