import { QueryHandler } from '../../../../types';
import { GetAlbumsByGenresQuery } from './get-albums-by-genres.query';
import { AlbumService } from '../../../../components/album';

export class GetAlbumsByGenresHandler implements QueryHandler<GetAlbumsByGenresQuery> {
  constructor(private readonly _service: AlbumService) {}

  execute({ genres, options }: GetAlbumsByGenresQuery) {
    return this._service.getByGenres(genres, options);
  }
}
