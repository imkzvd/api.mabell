import { CommandHandler } from '../../../../types';
import { DeleteAdminCommand } from './delete-admin.command';
import { AdminDeleteService } from '../../../../components/admin';

export class DeleteAdminHandler implements CommandHandler<DeleteAdminCommand> {
  constructor(private readonly _service: AdminDeleteService) {}

  async execute({ id }: DeleteAdminCommand) {
    await this._service.deleteById(id);
  }
}
