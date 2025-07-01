import { CommandHandler } from '@core/app/types';
import { LoginService } from '@core/app/components/login/login.service';
import { LoginUserCommand } from '@core/app/cqrs/user/commands/login-user/login-user.command';

export class LoginUserHandler implements CommandHandler<LoginUserCommand> {
  constructor(private readonly _loginService: LoginService) {}

  async execute({ payload }: LoginUserCommand) {
    return await this._loginService.loginUser(payload);
  }
}
