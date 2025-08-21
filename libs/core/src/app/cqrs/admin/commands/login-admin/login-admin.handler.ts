import { CommandHandler } from '../../../../types';
import { LoginAdminCommand } from './login-admin.command';
import { AdminLoginService } from '../../../../components/admin';

export class LoginAdminHandler implements CommandHandler<LoginAdminCommand> {
  constructor(private readonly _service: AdminLoginService) {}

  async execute({ payload }: LoginAdminCommand) {
    console.log(payload);
    const id = await this._service.login(payload);

    return { id };
  }
}
