import { Query } from '../../../../types';
import { IndexedAlbumsDTO } from '../../../../dtos';

export class GetAlbumsQuery extends Query<IndexedAlbumsDTO> {
  constructor(public readonly q: string) {
    super();
  }
}
