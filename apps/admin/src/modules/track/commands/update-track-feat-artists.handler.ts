import { CommandHandler } from '@nestjs/cqrs';
import { UpdateTrackFeatArtistsHandler as CoreUpdateTrackFeatArtistsHandler } from '@core/app/cqrs/track/commands/update-track-feat-artists/update-track-feat-artists.handler';
import { UpdateTrackFeatArtistsCommand } from '@core/app/cqrs/track/commands/update-track-feat-artists/update-track-feat-artists.command';
import { ArtistVerifyService } from '@core/app/components/artist/services/artist-verify.service';
import { TrackUpdateService } from '@core/app/components/track/services/track-update.service';

@CommandHandler(UpdateTrackFeatArtistsCommand)
export class UpdateTrackFeatArtistsHandler extends CoreUpdateTrackFeatArtistsHandler {
  constructor(artistVerifyService: ArtistVerifyService, trackUpdateService: TrackUpdateService) {
    super(artistVerifyService, trackUpdateService);
  }
}
