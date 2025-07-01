import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { TrackService } from '@core/app/components/track/track.service';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { GetArtistTracksQuery } from '@core/app/cqrs/track/queries/get-artist-tracks/get-artist-tracks.query';
import { GetArtistTracksHandler as CoreGetArtistTracksHandler } from '@core/app/cqrs/track/queries/get-artist-tracks/get-artist-tracks.handler';

@QueryHandler(GetArtistTracksQuery)
export class GetArtistTracksHandler implements IQueryHandler<GetArtistTracksQuery> {
  private readonly _coreHandler: CoreGetArtistTracksHandler;

  constructor(
    @Inject(ArtistService) artistService: ArtistService,
    @Inject(TrackService) trackService: TrackService,
  ) {
    this._coreHandler = new CoreGetArtistTracksHandler(artistService, trackService);
  }

  async execute(query: GetArtistTracksQuery) {
    return this._coreHandler.execute(query);
  }
}
