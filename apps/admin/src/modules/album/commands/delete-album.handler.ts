import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.DeleteAlbumCommand)
export class DeleteAlbumHandler extends App.CQRS.DeleteAlbumHandler {
  constructor(service: App.Components.Album.AlbumDeleteService) {
    super(service);
  }
}
