import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@QueryHandler(App.CQRS.GetArtistLatestAlbumQuery)
export class GetArtistLatestAlbumHandler extends App.CQRS.GetArtistLatestAlbumHandler {
  constructor(service: App.Components.Album.AlbumService) {
    super(service);
  }
}
