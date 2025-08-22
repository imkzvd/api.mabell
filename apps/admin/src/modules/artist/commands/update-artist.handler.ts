import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.UpdateArtistCommand)
export class UpdateArtistHandler extends App.CQRS.UpdateArtistHandler {
  constructor(service: App.Components.Artist.ArtistUpdateService) {
    super(service);
  }
}
