import { CommandHandler } from '@core/app/types';
import { AdminLoginService } from '@core/app/components/admin/services/admin-login.service';
import { LoginAdminCommand } from '@core/app/cqrs/admin/commands/login-admin/login-admin.command';

export class LoginAdminHandler implements CommandHandler<LoginAdminCommand> {
  constructor(private readonly _service: AdminLoginService) {}

  async execute({ payload }: LoginAdminCommand) {
    return await this._service.login(payload);
  }
}
