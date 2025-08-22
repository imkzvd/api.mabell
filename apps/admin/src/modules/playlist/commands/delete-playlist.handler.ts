import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.DeletePlaylistCommand)
export class DeletePlaylistHandler extends App.CQRS.DeletePlaylistHandler {
  constructor(service: App.Components.Playlist.PlaylistDeleteService) {
    super(service);
  }
}
