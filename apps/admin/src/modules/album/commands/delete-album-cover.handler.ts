import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.DeleteAlbumCoverCommand)
export class DeleteAlbumCoverHandler extends App.CQRS.DeleteAlbumCoverHandler {
  constructor(service: App.Components.Album.AlbumUpdateService) {
    super(service);
  }
}
