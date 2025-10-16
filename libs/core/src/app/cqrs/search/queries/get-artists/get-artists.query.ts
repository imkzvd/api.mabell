import { Query } from '../../../../types';
import { IndexedArtistsDTO } from '../../../../dtos';

export class GetArtistsQuery extends Query<IndexedArtistsDTO> {
  constructor(public readonly q: string) {
    super();
  }
}
