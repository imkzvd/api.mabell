import { Query } from '@nestjs/cqrs';
import { IndexedArtistDTO } from '../../ports/search-service/dtos/indexed-artist.dto';

export class GetArtistsQuery extends Query<IndexedArtistDTO[]> {
  constructor(public readonly q: string) {
    super();
  }
}
