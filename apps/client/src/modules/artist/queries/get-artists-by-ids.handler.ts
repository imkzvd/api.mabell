import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@QueryHandler(App.CQRS.GetArtistsByIdsQuery)
export class GetArtistsByIdsHandler extends App.CQRS.GetArtistsByIdsHandler {
  constructor(service: App.Components.Artist.ArtistService) {
    super(service);
  }
}
