import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.UpdateAlbumCommand)
export class UpdateAlbumHandler extends App.CQRS.UpdateAlbumHandler {
  constructor(service: App.Components.Album.AlbumUpdateService) {
    super(service);
  }
}
