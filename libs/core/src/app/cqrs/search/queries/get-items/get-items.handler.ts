import { QueryHandler } from '@core/app/types';
import { GetItemsQuery } from '@core/app/cqrs/search/queries/get-items/get-items.query';
import { SearchService } from '@core/app/common/ports/search-service/search-service.port';

export class GetItemsHandler implements QueryHandler<GetItemsQuery> {
  constructor(private readonly _searchService: SearchService) {}

  async execute({ q }: GetItemsQuery) {
    return this._searchService.findByKey(q);
  }
}
