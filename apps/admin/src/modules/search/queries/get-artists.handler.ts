import { Inject } from '@nestjs/common';
import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';
import { SearchService } from '@api.mabell/search';

@QueryHandler(App.CQRS.GetArtistsQuery)
export class GetArtistsHandler extends App.CQRS.GetArtistsHandler {
  constructor(@Inject(SearchService) service: App.Ports.SearchService) {
    super(service);
  }
}
