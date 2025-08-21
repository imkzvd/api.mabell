import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.DeleteUserAvatarCommand)
export class DeleteUserAvatarHandler extends App.CQRS.DeleteUserAvatarHandler {
  constructor(service: App.Components.User.UserUpdateService) {
    super(service);
  }
}
