import { QueryHandler } from '@nestjs/cqrs';
import { GetArtistTracksQuery } from '@core/app/cqrs/track/queries/get-artist-tracks/get-artist-tracks.query';
import { GetArtistTracksHandler as CoreGetArtistTracksHandler } from '@core/app/cqrs/track/queries/get-artist-tracks/get-artist-tracks.handler';
import { TrackService } from '@core/app/components/track/services/track.service';
import { ArtistVerifyService } from '@core/app/components/artist/services/artist-verify.service';

@QueryHandler(GetArtistTracksQuery)
export class GetArtistTracksHandler extends CoreGetArtistTracksHandler {
  constructor(artistVerifyService: ArtistVerifyService, trackService: TrackService) {
    super(artistVerifyService, trackService);
  }
}
