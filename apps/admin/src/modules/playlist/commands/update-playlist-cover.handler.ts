import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.UpdatePlaylistCoverCommand)
export class UpdatePlaylistCoverHandler extends App.CQRS.UpdatePlaylistCoverHandler {
  constructor(service: App.Components.Playlist.PlaylistUpdateService) {
    super(service);
  }
}
