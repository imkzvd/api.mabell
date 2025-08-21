import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.LoginUserCommand)
export class LoginUserHandler extends App.CQRS.LoginUserHandler {
  constructor(userLoginService: App.Components.User.UserLoginService) {
    super(userLoginService);
  }
}
