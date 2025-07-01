import { QueryHandler } from '@core/app/types';
import { TrackService } from '@core/app/components/track/track.service';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { NotFoundException } from '@core/shared/exceptions';
import { GetArtistTracksQuery } from '@core/app/cqrs/track/queries/get-artist-tracks/get-artist-tracks.query';

export class GetArtistTracksHandler implements QueryHandler<GetArtistTracksQuery> {
  constructor(
    private readonly _artistService: ArtistService,
    private readonly _trackService: TrackService,
  ) {}

  async execute({ artistId, options }: GetArtistTracksQuery) {
    const verifiedArtistId = await this._artistService.verifyArtistId(artistId);

    if (!verifiedArtistId) {
      throw new NotFoundException('Artist does not exist');
    }

    return this._trackService.getTracksByArtistId(artistId, options);
  }
}
