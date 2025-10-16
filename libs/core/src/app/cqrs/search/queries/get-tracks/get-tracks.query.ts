import { Query } from '../../../../types';
import { IndexedTracksDTO } from '../../../../dtos';

export class GetTracksQuery extends Query<IndexedTracksDTO> {
  constructor(public readonly q: string) {
    super();
  }
}
