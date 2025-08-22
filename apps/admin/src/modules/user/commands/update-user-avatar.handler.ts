import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.UpdateUserAvatarCommand)
export class UpdateUserAvatarHandler extends App.CQRS.UpdateUserAvatarHandler {
  constructor(service: App.Components.User.UserUpdateService) {
    super(service);
  }
}
