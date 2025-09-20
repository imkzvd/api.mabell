import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@QueryHandler(App.CQRS.GetArtistAlbumsQuery)
export class GetArtistAlbumsHandler extends App.CQRS.GetArtistAlbumsHandler {
  constructor(
    artistVerifyService: App.Components.Artist.ArtistVerifyService,
    albumService: App.Components.Album.AlbumService,
  ) {
    super(artistVerifyService, albumService);
  }
}
