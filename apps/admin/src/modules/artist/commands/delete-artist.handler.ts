import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.DeleteArtistCommand)
export class DeleteArtistHandler extends App.CQRS.DeleteArtistHandler {
  constructor(service: App.Components.Artist.ArtistDeleteService) {
    super(service);
  }
}
