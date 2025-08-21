import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.CreateAdminCommand)
export class CreateAdminHandler extends App.CQRS.CreateAdminHandler {
  constructor(service: App.Components.Admin.AdminCreateService) {
    super(service);
  }
}
