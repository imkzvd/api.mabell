import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.CreateAdminAccessTokenCommand)
export class CreateAdminAccessTokenHandler extends App.CQRS.CreateAdminAccessTokenHandler {
  constructor(
    adminService: App.Components.Admin.AdminService,
    adminTokenCreateService: App.Components.AdminToken.AdminTokenCreateService,
  ) {
    super(adminService, adminTokenCreateService);
  }
}
