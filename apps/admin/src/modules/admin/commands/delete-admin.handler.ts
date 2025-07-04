import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { AdminService } from '@core/app/components/admin/admin.service';
import { DeleteAdminCommand } from '@core/app/cqrs/admin/commands/delete-admin/delete-admin.command';
import { DeleteAdminHandler as CoreDeleteAdminHandler } from '@core/app/cqrs/admin/commands/delete-admin/delete-admin.handler';

@CommandHandler(DeleteAdminCommand)
export class DeleteAdminHandler extends CoreDeleteAdminHandler {
  constructor(@Inject(AdminService) service: AdminService) {
    super(service);
  }
}
