import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.UpdateAdminCommand)
export class UpdateAdminHandler extends App.CQRS.UpdateAdminHandler {
  constructor(service: App.Components.Admin.AdminUpdateService) {
    super(service);
  }
}
