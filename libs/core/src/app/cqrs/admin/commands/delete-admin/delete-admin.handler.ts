import { CommandHandler } from '@core/app/types';
import { AdminDeleteService } from '@core/app/components/admin/services/admin-delete.service';
import { DeleteAdminCommand } from '@core/app/cqrs/admin/commands/delete-admin/delete-admin.command';

export class DeleteAdminHandler implements CommandHandler<DeleteAdminCommand> {
  constructor(private readonly _service: AdminDeleteService) {}

  async execute({ id }: DeleteAdminCommand) {
    return await this._service.delete(id);
  }
}
