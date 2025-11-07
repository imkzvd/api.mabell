import { QueryHandler } from '../../../../types';
import { GetPlaylistsByIdsQuery } from './get-playlists-by-ids.query';
import { PlaylistService } from '../../../../components/playlist';

export class GetPlaylistsByIdsHandler implements QueryHandler<GetPlaylistsByIdsQuery> {
  constructor(private readonly _service: PlaylistService) {}

  execute({ ids, options }: GetPlaylistsByIdsQuery) {
    return this._service.findByIds(ids, options);
  }
}
