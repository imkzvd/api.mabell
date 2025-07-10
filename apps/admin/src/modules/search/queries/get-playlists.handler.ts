import { QueryHandler } from '@nestjs/cqrs';
import { SearchService } from '@core/app/common/ports/search-service/search-service.port';
import { GetPlaylistsQuery } from '@core/app/cqrs/search/queries/get-playlists/get-playlists.query';
import { GetPlaylistsHandler as CoreGetPlaylistsHandler } from '@core/app/cqrs/search/queries/get-playlists/get-playlists.handler';

@QueryHandler(GetPlaylistsQuery)
export class GetPlaylistsHandler extends CoreGetPlaylistsHandler {
  constructor(service: SearchService) {
    super(service);
  }
}
