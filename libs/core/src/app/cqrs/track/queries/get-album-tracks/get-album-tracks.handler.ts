import { QueryHandler } from '@core/app/types';
import { NotFoundException } from '@core/shared/exceptions';
import { GetAlbumTracksQuery } from '@core/app/cqrs/track/queries/get-album-tracks/get-album-tracks.query';
import { AlbumVerifyService } from '@core/app/components/album/services/album-verify.service';
import { TrackService } from '@core/app/components/track/services/track.service';

export class GetAlbumTracksHandler implements QueryHandler<GetAlbumTracksQuery> {
  constructor(
    private readonly _albumVerifyService: AlbumVerifyService,
    private readonly _trackService: TrackService,
  ) {}

  async execute({ albumId, options }: GetAlbumTracksQuery) {
    const verifiedAlbumId = await this._albumVerifyService.verify(albumId);

    if (!verifiedAlbumId) {
      throw new NotFoundException('Album does not exist');
    }

    return this._trackService.findByAlbumId(albumId, options);
  }
}
