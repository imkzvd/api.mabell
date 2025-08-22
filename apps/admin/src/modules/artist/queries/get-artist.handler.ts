import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@QueryHandler(App.CQRS.GetArtistQuery)
export class GetArtistHandler extends App.CQRS.GetArtistHandler {
  constructor(service: App.Components.Artist.ArtistService) {
    super(service);
  }
}
