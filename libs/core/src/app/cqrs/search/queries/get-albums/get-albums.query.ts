import { Query } from '../../../../types';
import { IndexedAlbumDTO } from '../../../../dtos';

export class GetAlbumsQuery extends Query<IndexedAlbumDTO[]> {
  constructor(public readonly q: string) {
    super();
  }
}
