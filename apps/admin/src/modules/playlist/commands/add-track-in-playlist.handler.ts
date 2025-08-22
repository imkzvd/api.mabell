import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.AddTrackInPlaylistCommand)
export class AddTrackInPlaylistHandler extends App.CQRS.AddTrackInPlaylistHandler {
  constructor(
    trackVerifyService: App.Components.Track.TrackVerifyService,
    playlistUpdateService: App.Components.Playlist.PlaylistUpdateService,
  ) {
    super(trackVerifyService, playlistUpdateService);
  }
}
