import { QueryHandler } from '../../../../types';
import { GetAlbumTracksQuery } from './get-album-tracks.query';
import { AlbumVerifyService } from '../../../../components/album';
import { TrackService } from '../../../../components/track';
import { NotFoundException } from '../../../../../shared/exceptions';

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
