import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.RefreshUserPasswordCommand)
export class RefreshUserPasswordHandler extends App.CQRS.RefreshUserPasswordHandler {
  constructor(service: App.Components.User.UserUpdateService) {
    super(service);
  }
}
