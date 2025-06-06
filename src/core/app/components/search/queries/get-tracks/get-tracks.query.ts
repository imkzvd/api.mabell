import { Query } from '@nestjs/cqrs';
import { IndexedTrackDTO } from '../../ports/search-service/dtos/indexed-track.dto';

export class GetTracksQuery extends Query<IndexedTrackDTO[]> {
  constructor(public readonly q: string) {
    super();
  }
}
