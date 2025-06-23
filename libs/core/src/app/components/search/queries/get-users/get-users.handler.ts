import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  SEARCH_SERVICE_DI_TOKEN,
  SearchService,
} from '../../ports/search-service/search-service.port';
import { GetUsersQuery } from './get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(@Inject(SEARCH_SERVICE_DI_TOKEN) private readonly _searchService: SearchService) {}

  async execute({ q }: GetUsersQuery) {
    return this._searchService.findUsersByKey(q);
  }
}
