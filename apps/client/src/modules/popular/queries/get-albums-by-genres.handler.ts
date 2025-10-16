import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@QueryHandler(App.CQRS.GetAlbumsByGenresQuery)
export class GetAlbumsByGenresHandler extends App.CQRS.GetAlbumsByGenresHandler {
  constructor(service: App.Components.Album.AlbumService) {
    super(service);
  }
}
