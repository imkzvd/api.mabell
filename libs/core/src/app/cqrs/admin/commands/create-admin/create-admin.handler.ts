import { CommandHandler } from '@core/app/types';
import { AdminCreateService } from '@core/app/components/admin/services/admin-create.service';
import { CreateAdminCommand } from '@core/app/cqrs/admin/commands/create-admin/create-admin.command';

export class CreateAdminHandler implements CommandHandler<CreateAdminCommand> {
  constructor(private readonly _service: AdminCreateService) {}

  async execute() {
    return await this._service.create();
  }
}
