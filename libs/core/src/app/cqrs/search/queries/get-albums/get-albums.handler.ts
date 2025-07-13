import { QueryHandler } from '@core/app/types';
import { GetAlbumsQuery } from '@core/app/cqrs/search/queries/get-albums/get-albums.query';
import { SearchService } from '@core/app/common/ports/search-service/search-service.port';

export class GetAlbumsHandler implements QueryHandler<GetAlbumsQuery> {
  constructor(private readonly _service: SearchService) {}

  async execute({ q }: GetAlbumsQuery) {
    return this._service.findAlbums(q);
  }
}
