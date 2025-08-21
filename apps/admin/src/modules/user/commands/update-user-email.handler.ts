import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.UpdateUserEmailCommand)
export class UpdateUserEmailHandler extends App.CQRS.UpdateUserEmailHandler {
  constructor(service: App.Components.User.UserUpdateService) {
    super(service);
  }
}
