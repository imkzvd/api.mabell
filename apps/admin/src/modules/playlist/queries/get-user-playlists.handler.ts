import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@QueryHandler(App.CQRS.GetUserPlaylistsQuery)
export class GetUserPlaylistsHandler extends App.CQRS.GetUserPlaylistsHandler {
  constructor(
    userVerifyService: App.Components.User.UserVerifyService,
    playlistService: App.Components.Playlist.PlaylistService,
  ) {
    super(userVerifyService, playlistService);
  }
}
