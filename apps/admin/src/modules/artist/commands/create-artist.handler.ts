import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.CreateArtistCommand)
export class CreateArtistHandler extends App.CQRS.CreateArtistHandler {
  constructor(service: App.Components.Artist.ArtistCreateService) {
    super(service);
  }
}
