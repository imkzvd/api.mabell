import { QueryHandler } from '@core/app/types';
import { TrackService } from '@core/app/components/track/track.service';
import { AlbumService } from '@core/app/components/album/album.service';
import { NotFoundException } from '@core/shared/exceptions';
import { GetAlbumTracksQuery } from '@core/app/cqrs/track/queries/get-album-tracks/get-album-tracks.query';

export class GetAlbumTracksHandler implements QueryHandler<GetAlbumTracksQuery> {
  constructor(
    private readonly _albumService: AlbumService,
    private readonly _trackService: TrackService,
  ) {}

  async execute({ albumId, options }: GetAlbumTracksQuery) {
    const verifiedAlbumId = await this._albumService.verifyAlbumId(albumId);

    if (!verifiedAlbumId) {
      throw new NotFoundException('Album does not exist');
    }

    return this._trackService.getTracksByAlbumId(albumId, options);
  }
}
