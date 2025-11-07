import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@QueryHandler(App.CQRS.GetAlbumsByIdsQuery)
export class GetAlbumsByIdsHandler extends App.CQRS.GetAlbumsByIdsHandler {
  constructor(service: App.Components.Album.AlbumService) {
    super(service);
  }
}
