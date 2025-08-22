import { CommandHandler } from '../../../../types';
import { LoginUserCommand } from './login-user.command';
import { UserLoginService } from '../../../../components/user';

export class LoginUserHandler implements CommandHandler<LoginUserCommand> {
  constructor(private readonly _service: UserLoginService) {}

  async execute({ payload }: LoginUserCommand) {
    const id = await this._service.login(payload);

    return { id };
  }
}
