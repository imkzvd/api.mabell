import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.UpdateTrackFeatArtistsCommand)
export class UpdateTrackFeatArtistsHandler extends App.CQRS.UpdateTrackFeatArtistsHandler {
  constructor(
    artistVerifyService: App.Components.Artist.ArtistVerifyService,
    trackUpdateService: App.Components.Track.TrackUpdateService,
  ) {
    super(artistVerifyService, trackUpdateService);
  }
}
