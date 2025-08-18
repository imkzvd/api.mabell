import { Query } from '../../../../types';
import { IndexedItemsDTO } from '../../../../dtos';

export class GetItemsQuery extends Query<IndexedItemsDTO> {
  constructor(public readonly q: string) {
    super();
  }
}
