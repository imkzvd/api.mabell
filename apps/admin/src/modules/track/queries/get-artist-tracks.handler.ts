import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { TrackService } from '@core/app/components/track/track.service';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { GetArtistTracksQuery } from '@core/app/cqrs/track/queries/get-artist-tracks/get-artist-tracks.query';
import { GetArtistTracksHandler as CoreGetArtistTracksHandler } from '@core/app/cqrs/track/queries/get-artist-tracks/get-artist-tracks.handler';

@QueryHandler(GetArtistTracksQuery)
export class GetArtistTracksHandler extends CoreGetArtistTracksHandler {
  constructor(
    @Inject(ArtistService) artistService: ArtistService,
    @Inject(TrackService) trackService: TrackService,
  ) {
    super(artistService, trackService);
  }
}
