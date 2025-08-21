import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.DeleteAdminCommand)
export class DeleteAdminHandler extends App.CQRS.DeleteAdminHandler {
  constructor(service: App.Components.Admin.AdminDeleteService) {
    super(service);
  }
}
