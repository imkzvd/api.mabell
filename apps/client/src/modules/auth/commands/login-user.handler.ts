import { CommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from '@core/app/cqrs/user/commands/login-user/login-user.command';
import { LoginUserHandler as CoreLoginUserHandler } from '@core/app/cqrs/user/commands/login-user/login-user.handler';
import { UserLoginService } from '@core/app/components/user/services/user-login.service';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler extends CoreLoginUserHandler {
  constructor(userLoginService: UserLoginService) {
    super(userLoginService);
  }
}
