import { QueryHandler } from '../../../../types';
import { GetArtistTracksQuery } from './get-artist-tracks.query';
import { ArtistVerifyService } from '../../../../components/artist';
import { TrackService } from '../../../../components/track';
import { NotFoundException } from '../../../../../shared/exceptions';

export class GetArtistTracksHandler implements QueryHandler<GetArtistTracksQuery> {
  constructor(
    private readonly _artistVerifyService: ArtistVerifyService,
    private readonly _trackService: TrackService,
  ) {}

  async execute({ artistId, options }: GetArtistTracksQuery) {
    const verifiedArtistId = await this._artistVerifyService.verifyById(artistId);

    if (!verifiedArtistId) {
      throw new NotFoundException('Artist does not exist');
    }

    return this._trackService.findByArtistId(artistId, options);
  }
}
