import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetArtistTracksQuery } from './get-artist-tracks.query';
import { TrackService } from '../../track.service';

@QueryHandler(GetArtistTracksQuery)
export class GetArtistTracksHandler implements IQueryHandler<GetArtistTracksQuery> {
  constructor(@Inject(TrackService) private readonly _trackService: TrackService) {}

  async execute({ artistId, options }: GetArtistTracksQuery) {
    return this._trackService.getTracksByArtistId(artistId, options);
  }
}
