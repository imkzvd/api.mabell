import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.DeletePlaylistCoverCommand)
export class DeletePlaylistCoverHandler extends App.CQRS.DeletePlaylistCoverHandler {
  constructor(service: App.Components.Playlist.PlaylistUpdateService) {
    super(service);
  }
}
