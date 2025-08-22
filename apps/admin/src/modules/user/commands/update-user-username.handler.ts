import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.UpdateUserUsernameCommand)
export class UpdateUserUsernameHandler extends App.CQRS.UpdateUserUsernameHandler {
  constructor(service: App.Components.User.UserUpdateService) {
    super(service);
  }
}
