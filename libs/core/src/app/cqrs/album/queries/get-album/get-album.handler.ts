import { QueryHandler } from '../../../../types';
import { GetAlbumQuery } from './get-album.query';
import { AlbumService } from '../../../../components/album';

export class GetAlbumHandler implements QueryHandler<GetAlbumQuery> {
  constructor(private readonly _albumService: AlbumService) {}

  execute({ id, options }: GetAlbumQuery) {
    return this._albumService.findById(id, options);
  }
}
