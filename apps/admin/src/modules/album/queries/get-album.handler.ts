import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@QueryHandler(App.CQRS.GetAlbumQuery)
export class GetAlbumHandler extends App.CQRS.GetAlbumHandler {
  constructor(service: App.Components.Album.AlbumService) {
    super(service);
  }
}
