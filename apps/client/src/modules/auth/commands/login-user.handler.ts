import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { LoginUserCommand } from '@core/app/cqrs/user/commands/login-user/login-user.command';
import { LoginUserHandler as CoreLoginUserHandler } from '@core/app/cqrs/user/commands/login-user/login-user.handler';
import { LoginService } from '@core/app/components/login/login.service';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler extends CoreLoginUserHandler {
  constructor(@Inject(LoginService) readonly loginService: LoginService) {
    super(loginService);
  }
}
