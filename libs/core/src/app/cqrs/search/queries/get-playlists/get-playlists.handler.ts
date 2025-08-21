import { QueryHandler } from '../../../../types';
import { GetPlaylistsQuery } from './get-playlists.query';
import { SearchService } from '../../../../ports';

export class GetPlaylistsHandler implements QueryHandler<GetPlaylistsQuery> {
  constructor(private readonly _service: SearchService) {}

  execute({ q }: GetPlaylistsQuery) {
    return this._service.findPlaylists(q);
  }
}
