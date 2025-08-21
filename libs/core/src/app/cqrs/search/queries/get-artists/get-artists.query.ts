import { Query } from '../../../../types';
import { IndexedArtistDTO } from '../../../../dtos';

export class GetArtistsQuery extends Query<IndexedArtistDTO[]> {
  constructor(public readonly q: string) {
    super();
  }
}
