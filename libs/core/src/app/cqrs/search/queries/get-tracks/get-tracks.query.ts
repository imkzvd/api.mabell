import { Query } from '../../../../types';
import { IndexedTrackDTO } from '../../../../dtos';

export class GetTracksQuery extends Query<IndexedTrackDTO[]> {
  constructor(public readonly q: string) {
    super();
  }
}
