import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@QueryHandler(App.CQRS.ValidateAdminRefreshTokenQuery)
export class ValidateAdminRefreshTokenHandler extends App.CQRS.ValidateAdminRefreshTokenHandler {
  constructor(service: App.Components.AdminToken.AdminTokenValidateService) {
    super(service);
  }
}
