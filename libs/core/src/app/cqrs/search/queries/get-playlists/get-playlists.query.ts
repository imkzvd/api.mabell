import { Query } from '@core/app/types';
import { IndexedPlaylistDTO } from '@core/app/common/ports/search-service/dtos/indexed-playlist.dto';

export class GetPlaylistsQuery extends Query<IndexedPlaylistDTO[]> {
  constructor(public readonly q: string) {
    super();
  }
}
