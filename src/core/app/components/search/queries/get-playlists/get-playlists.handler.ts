import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  SEARCH_SERVICE_DI_TOKEN,
  SearchService,
} from '../../ports/search-service/search-service.port';
import { GetPlaylistsQuery } from './get-playlists.query';

@QueryHandler(GetPlaylistsQuery)
export class GetPlaylistsHandler implements IQueryHandler<GetPlaylistsQuery> {
  constructor(@Inject(SEARCH_SERVICE_DI_TOKEN) private readonly _searchService: SearchService) {}

  async execute({ q }: GetPlaylistsQuery) {
    return this._searchService.findPlaylistsByKey(q);
  }
}
