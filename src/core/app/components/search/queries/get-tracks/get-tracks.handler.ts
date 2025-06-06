import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  SEARCH_SERVICE_DI_TOKEN,
  SearchService,
} from '../../ports/search-service/search-service.port';
import { GetTracksQuery } from './get-tracks.query';

@QueryHandler(GetTracksQuery)
export class GetTracksHandler implements IQueryHandler<GetTracksQuery> {
  constructor(@Inject(SEARCH_SERVICE_DI_TOKEN) private readonly _searchService: SearchService) {}

  async execute({ q }: GetTracksQuery) {
    return this._searchService.findTracksByKey(q);
  }
}
