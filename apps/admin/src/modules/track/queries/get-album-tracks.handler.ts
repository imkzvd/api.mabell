import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@QueryHandler(App.CQRS.GetAlbumTracksQuery)
export class GetAlbumTracksHandler extends App.CQRS.GetAlbumTracksHandler {
  constructor(
    albumVerifyService: App.Components.Album.AlbumVerifyService,
    trackService: App.Components.Track.TrackService,
  ) {
    super(albumVerifyService, trackService);
  }
}
