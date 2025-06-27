import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  SEARCH_SERVICE_DI_TOKEN,
  SearchService,
} from '../../ports/search-service/search-service.port';
import { GetArtistsQuery } from './get-artists.query';

@QueryHandler(GetArtistsQuery)
export class GetArtistsHandler implements IQueryHandler<GetArtistsQuery> {
  constructor(@Inject(SEARCH_SERVICE_DI_TOKEN) private readonly _searchService: SearchService) {}

  async execute({ q }: GetArtistsQuery) {
    return this._searchService.findArtistsByKey(q);
  }
}
