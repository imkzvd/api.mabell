import { CommandHandler } from '@core/app/types';
import { LoginService } from '@core/app/components/login/login.service';
import { LoginAdminCommand } from '@core/app/cqrs/admin/commands/login-admin/login-admin.command';

export class LoginAdminHandler implements CommandHandler<LoginAdminCommand> {
  constructor(private readonly _service: LoginService) {}

  async execute({ payload }: LoginAdminCommand) {
    return await this._service.loginAdmin(payload);
  }
}
