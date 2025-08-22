import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.UpdateArtistCoverCommand)
export class UpdateArtistCoverHandler extends App.CQRS.UpdateArtistCoverHandler {
  constructor(service: App.Components.Artist.ArtistUpdateService) {
    super(service);
  }
}
