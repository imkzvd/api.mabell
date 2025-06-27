import { Query } from '@core/app/types';
import { IndexedArtistDTO } from '@core/app/common/ports/search-service/dtos/indexed-artist.dto';

export class GetArtistsQuery extends Query<IndexedArtistDTO[]> {
  constructor(public readonly q: string) {
    super();
  }
}
