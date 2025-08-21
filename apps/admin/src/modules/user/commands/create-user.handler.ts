import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.CreateUserCommand)
export class CreateUserHandler extends App.CQRS.CreateUserHandler {
  constructor(service: App.Components.User.UserCreateService) {
    super(service);
  }
}
