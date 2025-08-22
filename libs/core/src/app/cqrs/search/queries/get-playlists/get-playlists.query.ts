import { Query } from '../../../../types';
import { IndexedPlaylistDTO } from '../../../../dtos';

export class GetPlaylistsQuery extends Query<IndexedPlaylistDTO[]> {
  constructor(public readonly q: string) {
    super();
  }
}
