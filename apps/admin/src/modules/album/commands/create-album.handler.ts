import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.CreateAlbumCommand)
export class CreateAlbumHandler extends App.CQRS.CreateAlbumHandler {
  constructor(
    artistVerifyService: App.Components.Artist.ArtistVerifyService,
    albumCreateService: App.Components.Album.AlbumCreateService,
  ) {
    super(artistVerifyService, albumCreateService);
  }
}
