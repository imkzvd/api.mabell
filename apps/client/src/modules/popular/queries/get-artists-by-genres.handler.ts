import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@QueryHandler(App.CQRS.GetArtistsByGenresQuery)
export class GetArtistsByGenresHandler extends App.CQRS.GetArtistsByGenresHandler {
  constructor(service: App.Components.Artist.ArtistService) {
    super(service);
  }
}
