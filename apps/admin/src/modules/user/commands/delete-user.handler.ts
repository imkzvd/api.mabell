import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.DeleteUserCommand)
export class DeleteUserHandler extends App.CQRS.DeleteUserHandler {
  constructor(service: App.Components.User.UserDeleteService) {
    super(service);
  }
}
