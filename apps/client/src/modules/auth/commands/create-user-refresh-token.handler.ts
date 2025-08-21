import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.CreateUserRefreshTokenCommand)
export class CreateUserRefreshTokenHandler extends App.CQRS.CreateUserRefreshTokenHandler {
  constructor(
    userService: App.Components.User.UserService,
    userTokenCreateService: App.Components.UserToken.UserTokenCreateService,
  ) {
    super(userService, userTokenCreateService);
  }
}
