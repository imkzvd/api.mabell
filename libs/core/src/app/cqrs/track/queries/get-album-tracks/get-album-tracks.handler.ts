import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAlbumTracksQuery } from './get-album-tracks.query';
import { TrackService } from '../../../../components/track/track.service';
import { AlbumService } from '../../../../components/album/album.service';
import { NotFoundException } from '../../../../../shared/exceptions';

@QueryHandler(GetAlbumTracksQuery)
export class GetAlbumTracksHandler implements IQueryHandler<GetAlbumTracksQuery> {
  constructor(
    @Inject(AlbumService) private readonly _albumService: AlbumService,
    @Inject(TrackService) private readonly _trackService: TrackService,
  ) {}

  async execute({ albumId, options }: GetAlbumTracksQuery) {
    const verifiedAlbumId = await this._albumService.verifyAlbumId(albumId);

    if (!verifiedAlbumId) {
      throw new NotFoundException('Album does not exist');
    }

    return this._trackService.getTracksByAlbumId(albumId, options);
  }
}
