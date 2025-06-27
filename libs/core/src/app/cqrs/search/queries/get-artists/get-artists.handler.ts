import { QueryHandler } from '@core/app/types';
import { GetArtistsQuery } from '@core/app/cqrs/search/queries/get-artists/get-artists.query';
import { SearchService } from '@core/app/common/ports/search-service/search-service.port';

export class GetArtistsHandler implements QueryHandler<GetArtistsQuery> {
  constructor(private readonly _searchService: SearchService) {}

  async execute({ q }: GetArtistsQuery) {
    return this._searchService.findArtistsByKey(q);
  }
}
