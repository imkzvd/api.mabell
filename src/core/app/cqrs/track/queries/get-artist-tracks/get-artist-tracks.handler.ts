import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetArtistTracksQuery } from './get-artist-tracks.query';
import { TrackService } from '../../../../components/track/track.service';
import { ArtistService } from '../../../../components/artist/artist.service';
import { NotFoundException } from '../../../../../shared/exceptions';

@QueryHandler(GetArtistTracksQuery)
export class GetArtistTracksHandler implements IQueryHandler<GetArtistTracksQuery> {
  constructor(
    @Inject(ArtistService) private readonly _artistService: ArtistService,
    @Inject(TrackService) private readonly _trackService: TrackService,
  ) {}

  async execute({ artistId, options }: GetArtistTracksQuery) {
    const verifiedArtistId = await this._artistService.verifyArtistId(artistId);

    if (!verifiedArtistId) {
      throw new NotFoundException('Artist does not exist');
    }

    return this._trackService.getTracksByArtistId(artistId, options);
  }
}
