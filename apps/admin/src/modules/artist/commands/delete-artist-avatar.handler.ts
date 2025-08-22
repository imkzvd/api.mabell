import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.DeleteArtistAvatarCommand)
export class DeleteArtistAvatarHandler extends App.CQRS.DeleteArtistAvatarHandler {
  constructor(service: App.Components.Artist.ArtistUpdateService) {
    super(service);
  }
}
