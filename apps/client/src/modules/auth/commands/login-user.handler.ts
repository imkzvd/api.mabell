import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { LoginUserCommand } from '@core/app/cqrs/user/commands/login-user/login-user.command';
import { LoginUserHandler as CoreLoginUserHandler } from '@core/app/cqrs/user/commands/login-user/login-user.handler';
import { LoginService } from '@core/app/components/login/login.service';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  private readonly _coreHandler: CoreLoginUserHandler;

  constructor(@Inject(LoginService) readonly loginService: LoginService) {
    this._coreHandler = new CoreLoginUserHandler(loginService);
  }

  async execute(command: LoginUserCommand) {
    return this._coreHandler.execute(command);
  }
}
