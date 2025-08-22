import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@QueryHandler(App.CQRS.GetAdminsQuery)
export class GetAdminsHandler extends App.CQRS.GetAdminsHandler {
  constructor(service: App.Components.Admin.AdminService) {
    super(service);
  }
}
