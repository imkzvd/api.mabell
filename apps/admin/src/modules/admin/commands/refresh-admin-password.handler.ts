import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.RefreshAdminPasswordCommand)
export class RefreshAdminPasswordHandler extends App.CQRS.RefreshAdminPasswordHandler {
  constructor(service: App.Components.Admin.AdminUpdateService) {
    super(service);
  }
}
