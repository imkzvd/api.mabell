import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { AdminService } from '@core/app/components/admin/services/admin.service';
import { CreateAdminCommand } from '@core/app/cqrs/admin/commands/create-admin/create-admin.command';
import { CreateAdminHandler as CoreCreateAdminHandler } from '@core/app/cqrs/admin/commands/create-admin/create-admin.handler';

@CommandHandler(CreateAdminCommand)
export class CreateAdminHandler extends CoreCreateAdminHandler {
  constructor(@Inject(AdminService) readonly service: AdminService) {
    super(service);
  }
}
