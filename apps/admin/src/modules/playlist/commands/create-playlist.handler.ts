import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.CreatePlaylistCommand)
export class CreatePlaylistHandler extends App.CQRS.CreatePlaylistHandler {
  constructor(
    userVerifyService: App.Components.User.UserVerifyService,
    playlistCreateService: App.Components.Playlist.PlaylistCreateService,
  ) {
    super(userVerifyService, playlistCreateService);
  }
}
