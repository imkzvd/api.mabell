import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  SEARCH_SERVICE_DI_TOKEN,
  SearchService,
} from '../../ports/search-service/search-service.port';
import { GetItemsQuery } from './get-items.query';

@QueryHandler(GetItemsQuery)
export class GetItemsHandler implements IQueryHandler<GetItemsQuery> {
  constructor(@Inject(SEARCH_SERVICE_DI_TOKEN) private readonly _searchService: SearchService) {}

  async execute({ q }: GetItemsQuery) {
    return this._searchService.findByKey(q);
  }
}
