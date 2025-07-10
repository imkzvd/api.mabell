import { CommandHandler } from '@core/app/types';
import { LoginUserCommand } from '@core/app/cqrs/user/commands/login-user/login-user.command';
import { UserLoginService } from '@core/app/components/user/services/user-login.service';

export class LoginUserHandler implements CommandHandler<LoginUserCommand> {
  constructor(private readonly _service: UserLoginService) {}

  async execute({ payload }: LoginUserCommand) {
    return await this._service.login(payload);
  }
}
