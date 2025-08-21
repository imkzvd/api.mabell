import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.UpdateAlbumArtistsCommand)
export class UpdateAlbumArtistsHandler extends App.CQRS.UpdateAlbumArtistsHandler {
  constructor(
    artistVerifyService: App.Components.Artist.ArtistVerifyService,
    albumUpdateService: App.Components.Album.AlbumUpdateService,
  ) {
    super(artistVerifyService, albumUpdateService);
  }
}
