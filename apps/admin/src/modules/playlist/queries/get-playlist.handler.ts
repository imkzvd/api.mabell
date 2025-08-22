import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@QueryHandler(App.CQRS.GetPlaylistQuery)
export class GetPlaylistHandler extends App.CQRS.GetPlaylistHandler {
  constructor(service: App.Components.Playlist.PlaylistService) {
    super(service);
  }
}
