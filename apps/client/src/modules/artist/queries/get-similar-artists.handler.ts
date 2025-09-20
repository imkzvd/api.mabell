import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@QueryHandler(App.CQRS.GetSimilarArtistsQuery)
export class GetSimilarArtistsHandler extends App.CQRS.GetSimilarArtistsHandler {
  constructor(service: App.Components.Artist.ArtistService) {
    super(service);
  }
}
