import { CommandHandler } from '../../../../types';
import { CreateAdminCommand } from './create-admin.command';
import { AdminCreateService } from '../../../../components/admin';

export class CreateAdminHandler implements CommandHandler<CreateAdminCommand> {
  constructor(private readonly _service: AdminCreateService) {}

  async execute() {
    const id = await this._service.create();

    return { id };
  }
}
