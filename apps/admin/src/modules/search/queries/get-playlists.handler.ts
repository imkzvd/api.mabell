import { Inject } from '@nestjs/common';
import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';
import { SearchService } from '@api.mabell/search';

@QueryHandler(App.CQRS.GetPlaylistsQuery)
export class GetPlaylistsHandler extends App.CQRS.GetPlaylistsHandler {
  constructor(@Inject(SearchService) service: App.Ports.SearchService) {
    super(service);
  }
}
