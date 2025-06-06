import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  SEARCH_SERVICE_DI_TOKEN,
  SearchService,
} from '../../ports/search-service/search-service.port';
import { GetAlbumsQuery } from './get-albums.query';

@QueryHandler(GetAlbumsQuery)
export class GetAlbumsHandler implements IQueryHandler<GetAlbumsQuery> {
  constructor(@Inject(SEARCH_SERVICE_DI_TOKEN) private readonly _searchService: SearchService) {}

  async execute({ q }: GetAlbumsQuery) {
    return this._searchService.findAlbumsByKey(q);
  }
}
