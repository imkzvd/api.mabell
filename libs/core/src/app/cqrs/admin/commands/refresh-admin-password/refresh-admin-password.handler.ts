import { CommandHandler } from '../../../../types';
import { RefreshAdminPasswordCommand } from './refresh-admin-password.command';
import { AdminUpdateService } from '../../../../components/admin';

export class RefreshAdminPasswordHandler implements CommandHandler<RefreshAdminPasswordCommand> {
  constructor(private readonly _service: AdminUpdateService) {}

  async execute({ id }: RefreshAdminPasswordCommand) {
    const { password } = await this._service.refreshPasswordById(id);

    return { password };
  }
}
