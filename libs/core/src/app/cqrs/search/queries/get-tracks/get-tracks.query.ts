import { Query } from '@core/app/types';
import { IndexedTrackDTO } from '@core/app/common/ports/search-service/dtos/indexed-track.dto';

export class GetTracksQuery extends Query<IndexedTrackDTO[]> {
  constructor(public readonly q: string) {
    super();
  }
}
