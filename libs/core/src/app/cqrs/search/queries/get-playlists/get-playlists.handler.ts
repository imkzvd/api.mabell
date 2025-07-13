import { QueryHandler } from '@core/app/types';
import { GetPlaylistsQuery } from '@core/app/cqrs/search/queries/get-playlists/get-playlists.query';
import { SearchService } from '@core/app/common/ports/search-service/search-service.port';

export class GetPlaylistsHandler implements QueryHandler<GetPlaylistsQuery> {
  constructor(private readonly _service: SearchService) {}

  async execute({ q }: GetPlaylistsQuery) {
    return this._service.findPlaylists(q);
  }
}
