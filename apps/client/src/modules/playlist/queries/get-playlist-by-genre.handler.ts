import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@QueryHandler(App.CQRS.GetPlaylistsByGenreQuery)
export class GetPlaylistsByGenreHandler extends App.CQRS.GetPlaylistsByGenreHandler {
  constructor(service: App.Components.Playlist.PlaylistService) {
    super(service);
  }
}
