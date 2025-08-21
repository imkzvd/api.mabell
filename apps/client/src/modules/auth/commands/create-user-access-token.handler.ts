import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.CreateUserAccessTokenCommand)
export class CreateUserAccessTokenHandler extends App.CQRS.CreateUserAccessTokenHandler {
  constructor(
    userService: App.Components.User.UserService,
    userTokenCreateService: App.Components.UserToken.UserTokenCreateService,
  ) {
    super(userService, userTokenCreateService);
  }
}
