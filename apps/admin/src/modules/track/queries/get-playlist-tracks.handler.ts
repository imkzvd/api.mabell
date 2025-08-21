import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@QueryHandler(App.CQRS.GetPlaylistTracksQuery)
export class GetPlaylistTracksHandler extends App.CQRS.GetPlaylistTracksHandler {
  constructor(
    playlistService: App.Components.Playlist.PlaylistService,
    trackService: App.Components.Track.TrackService,
  ) {
    super(playlistService, trackService);
  }
}
