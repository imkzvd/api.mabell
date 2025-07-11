import { QueryHandler } from '@core/app/types';
import { NotFoundException } from '@core/shared/exceptions';
import { GetArtistTracksQuery } from '@core/app/cqrs/track/queries/get-artist-tracks/get-artist-tracks.query';
import { ArtistVerifyService } from '@core/app/components/artist/services/artist-verify.service';
import { TrackService } from '@core/app/components/track/services/track.service';

export class GetArtistTracksHandler implements QueryHandler<GetArtistTracksQuery> {
  constructor(
    private readonly _artistVerifyService: ArtistVerifyService,
    private readonly _trackService: TrackService,
  ) {}

  async execute({ artistId, options }: GetArtistTracksQuery) {
    const verifiedArtistId = await this._artistVerifyService.verify(artistId);

    if (!verifiedArtistId) {
      throw new NotFoundException('Artist does not exist');
    }

    return this._trackService.findByArtistId(artistId, options);
  }
}
