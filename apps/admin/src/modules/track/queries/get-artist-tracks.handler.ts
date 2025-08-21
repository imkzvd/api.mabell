import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@QueryHandler(App.CQRS.GetArtistTracksQuery)
export class GetArtistTracksHandler extends App.CQRS.GetArtistTracksHandler {
  constructor(
    artistVerifyService: App.Components.Artist.ArtistVerifyService,
    trackService: App.Components.Track.TrackService,
  ) {
    super(artistVerifyService, trackService);
  }
}
