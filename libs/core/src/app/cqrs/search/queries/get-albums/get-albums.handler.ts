import { QueryHandler } from '../../../../types';
import { GetAlbumsQuery } from './get-albums.query';
import { SearchService } from '../../../../ports';

export class GetAlbumsHandler implements QueryHandler<GetAlbumsQuery> {
  constructor(private readonly _service: SearchService) {}

  execute({ q }: GetAlbumsQuery) {
    return this._service.findAlbums(q);
  }
}
