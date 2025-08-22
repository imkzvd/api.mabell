import { App } from '@api.mabell/core';
import { CommandHandler } from '@api.mabell/cqrs';

@CommandHandler(App.CQRS.LoginAdminCommand)
export class LoginAdminHandler extends App.CQRS.LoginAdminHandler {
  constructor(service: App.Components.Admin.AdminLoginService) {
    super(service);
  }
}
