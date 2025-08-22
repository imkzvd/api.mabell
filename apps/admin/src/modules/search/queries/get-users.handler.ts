import { Inject } from '@nestjs/common';
import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';
import { SearchService } from '@api.mabell/search';

@QueryHandler(App.CQRS.GetUsersQuery)
export class GetUsersHandler extends App.CQRS.GetUsersHandler {
  constructor(@Inject(SearchService) service: App.Ports.SearchService) {
    super(service);
  }
}
