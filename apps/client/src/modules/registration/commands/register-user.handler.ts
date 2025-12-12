import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.RegisterUserCommand)
export class RegisterUserHandler extends App.CQRS.RegisterUserHandler {
  constructor(service: App.Components.User.UserRegistrationService) {
    super(service);
  }
}
