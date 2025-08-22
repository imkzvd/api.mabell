import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.DeleteArtistCoverCommand)
export class DeleteArtistCoverHandler extends App.CQRS.DeleteArtistCoverHandler {
  constructor(service: App.Components.Artist.ArtistUpdateService) {
    super(service);
  }
}
