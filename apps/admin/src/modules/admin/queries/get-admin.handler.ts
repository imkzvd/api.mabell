import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@QueryHandler(App.CQRS.GetAdminQuery)
export class GetAdminHandler extends App.CQRS.GetAdminHandler {
  constructor(service: App.Components.Admin.AdminService) {
    super(service);
  }
}
