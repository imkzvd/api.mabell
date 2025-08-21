import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.UpdateAlbumCoverCommand)
export class UpdateAlbumCoverHandler extends App.CQRS.UpdateAlbumCoverHandler {
  constructor(service: App.Components.Album.AlbumUpdateService) {
    super(service);
  }
}
