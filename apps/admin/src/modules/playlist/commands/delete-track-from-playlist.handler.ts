import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.DeleteTrackFromPlaylistCommand)
export class DeleteTrackFromPlaylistHandler extends App.CQRS.DeleteTrackFromPlaylistHandler {
  constructor(
    trackVerifyService: App.Components.Track.TrackVerifyService,
    playlistUpdateService: App.Components.Playlist.PlaylistUpdateService,
  ) {
    super(trackVerifyService, playlistUpdateService);
  }
}
