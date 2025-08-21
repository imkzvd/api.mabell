import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@QueryHandler(App.CQRS.GetUserQuery)
export class GetUserHandler extends App.CQRS.GetUserHandler {
  constructor(service: App.Components.User.UserService) {
    super(service);
  }
}
