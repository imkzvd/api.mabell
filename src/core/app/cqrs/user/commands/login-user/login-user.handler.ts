import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { LoginUserCommand } from './login-user.command';
import { LoginService } from '../../../../components/login/login.service';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(@Inject(LoginService) private readonly _loginService: LoginService) {}

  async execute({ payload }: LoginUserCommand) {
    return await this._loginService.loginUser(payload);
  }
}
