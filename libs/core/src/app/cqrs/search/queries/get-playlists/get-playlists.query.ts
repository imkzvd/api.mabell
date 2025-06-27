import { Query } from '@nestjs/cqrs';
import { IndexedPlaylistDTO } from '../../ports/search-service/dtos/indexed-playlist.dto';

export class GetPlaylistsQuery extends Query<IndexedPlaylistDTO[]> {
  constructor(public readonly q: string) {
    super();
  }
}
