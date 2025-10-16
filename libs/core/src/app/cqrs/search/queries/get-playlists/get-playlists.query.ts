import { Query } from '../../../../types';
import { IndexedPlaylistsDTO } from '../../../../dtos';

export class GetPlaylistsQuery extends Query<IndexedPlaylistsDTO> {
  constructor(public readonly q: string) {
    super();
  }
}
