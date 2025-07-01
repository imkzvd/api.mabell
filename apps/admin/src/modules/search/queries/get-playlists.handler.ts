import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SearchService } from '@core/app/common/ports/search-service/search-service.port';
import { TypesenseService } from '@infrastructure/typesense';
import { GetPlaylistsQuery } from '@core/app/cqrs/search/queries/get-playlists/get-playlists.query';
import { GetPlaylistsHandler as CoreGetPlaylistsHandler } from '@core/app/cqrs/search/queries/get-playlists/get-playlists.handler';

@QueryHandler(GetPlaylistsQuery)
export class GetPlaylistsHandler implements IQueryHandler<GetPlaylistsQuery> {
  private readonly coreHandler: CoreGetPlaylistsHandler;

  constructor(@Inject(TypesenseService) service: SearchService) {
    this.coreHandler = new CoreGetPlaylistsHandler(service);
  }

  async execute(query: GetPlaylistsQuery) {
    return this.coreHandler.execute(query);
  }
}
