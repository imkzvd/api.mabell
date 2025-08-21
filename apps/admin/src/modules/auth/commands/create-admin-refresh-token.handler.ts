import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.CreateAdminRefreshTokenCommand)
export class CreateAdminRefreshTokenHandler extends App.CQRS.CreateAdminRefreshTokenHandler {
  constructor(
    adminService: App.Components.Admin.AdminService,
    adminTokenCreateService: App.Components.AdminToken.AdminTokenCreateService,
  ) {
    super(adminService, adminTokenCreateService);
  }
}
