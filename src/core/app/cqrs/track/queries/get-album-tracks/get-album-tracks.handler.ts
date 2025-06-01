import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAlbumTracksQuery } from './get-album-tracks.query';
import { TrackService } from '../../../../components/track/track.service';

@QueryHandler(GetAlbumTracksQuery)
export class GetAlbumTracksHandler implements IQueryHandler<GetAlbumTracksQuery> {
  constructor(@Inject(TrackService) private readonly _trackService: TrackService) {}

  async execute({ albumId, options }: GetAlbumTracksQuery) {
    return this._trackService.getTracksByAlbumId(albumId, options);
  }
}
