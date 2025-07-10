import { CommandHandler } from '@nestjs/cqrs';
import { AdminCreateService } from '@core/app/components/admin/services/admin-create.service';
import { CreateAdminCommand } from '@core/app/cqrs/admin/commands/create-admin/create-admin.command';
import { CreateAdminHandler as CoreCreateAdminHandler } from '@core/app/cqrs/admin/commands/create-admin/create-admin.handler';

@CommandHandler(CreateAdminCommand)
export class CreateAdminHandler extends CoreCreateAdminHandler {
  constructor(service: AdminCreateService) {
    super(service);
  }
}
