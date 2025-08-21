import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.UpdateUserCommand)
export class UpdateUserHandler extends App.CQRS.UpdateUserHandler {
  constructor(service: App.Components.User.UserUpdateService) {
    super(service);
  }
}
