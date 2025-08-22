import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.UpdateAdminUsernameCommand)
export class UpdateAdminUsernameHandler extends App.CQRS.UpdateAdminUsernameHandler {
  constructor(service: App.Components.Admin.AdminUpdateService) {
    super(service);
  }
}
