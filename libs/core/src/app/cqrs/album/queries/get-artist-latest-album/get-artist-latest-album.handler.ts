import { QueryHandler } from '../../../../types';
import { GetArtistLatestAlbumQuery } from './get-artist-latest-album.query';
import { AlbumService } from '../../../../components/album';

export class GetArtistLatestAlbumHandler implements QueryHandler<GetArtistLatestAlbumQuery> {
  constructor(private readonly _albumService: AlbumService) {}

  execute({ id, options }: GetArtistLatestAlbumQuery) {
    return this._albumService.findLatestAlbumByArtistId(id, options);
  }
}
