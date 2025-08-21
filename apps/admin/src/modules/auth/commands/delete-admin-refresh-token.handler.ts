import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.DeleteAdminRefreshTokenCommand)
export class DeleteAdminRefreshTokenHandler extends App.CQRS.DeleteAdminRefreshTokenHandler {
  constructor(service: App.Components.AdminToken.AdminTokenDeleteService) {
    super(service);
  }
}
