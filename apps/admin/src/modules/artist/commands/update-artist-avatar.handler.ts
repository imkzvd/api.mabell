import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.UpdateArtistAvatarCommand)
export class UpdateArtistAvatarHandler extends App.CQRS.UpdateArtistAvatarHandler {
  constructor(service: App.Components.Artist.ArtistUpdateService) {
    super(service);
  }
}
