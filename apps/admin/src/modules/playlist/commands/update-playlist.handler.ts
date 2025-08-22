import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.UpdatePlaylistCommand)
export class UpdatePlaylistHandler extends App.CQRS.UpdatePlaylistHandler {
  constructor(service: App.Components.Playlist.PlaylistUpdateService) {
    super(service);
  }
}
