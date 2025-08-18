import { QueryHandler } from '../../../../types';
import { GetPlaylistQuery } from './get-playlist.query';
import { PlaylistService } from '../../../../components/playlist';

export class GetPlaylistHandler implements QueryHandler<GetPlaylistQuery> {
  constructor(private readonly _service: PlaylistService) {}

  execute({ id, options }: GetPlaylistQuery) {
    return this._service.findById(id, options);
  }
}
