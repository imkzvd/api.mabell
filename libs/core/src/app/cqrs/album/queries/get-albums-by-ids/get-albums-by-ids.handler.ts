import { QueryHandler } from '../../../../types';
import { GetAlbumsByIdsQuery } from './get-albums-by-ids.query';
import { AlbumService } from '../../../../components/album';

export class GetAlbumsByIdsHandler implements QueryHandler<GetAlbumsByIdsQuery> {
  constructor(private readonly _service: AlbumService) {}

  async execute({ ids, options }: GetAlbumsByIdsQuery) {
    return this._service.findByIds(ids, options);
  }
}
