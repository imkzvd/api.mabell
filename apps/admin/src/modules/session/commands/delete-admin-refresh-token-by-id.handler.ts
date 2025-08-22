import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.DeleteAdminRefreshTokenByIdCommand)
export class DeleteAdminRefreshTokenByIdHandler extends App.CQRS
  .DeleteAdminRefreshTokenByIdHandler {
  constructor(readonly service: App.Components.AdminToken.AdminTokenDeleteService) {
    super(service);
  }
}
