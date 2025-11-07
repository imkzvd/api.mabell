import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@QueryHandler(App.CQRS.GetPlaylistsByIdsQuery)
export class GetPlaylistsByIdsHandler extends App.CQRS.GetPlaylistsByIdsHandler {
  constructor(service: App.Components.Playlist.PlaylistService) {
    super(service);
  }
}
