import { Query } from '../../../../types';
import { IndexedItemsDTO } from '../../../../dtos';
import { SEARCH_COLLECTIONS } from '../../../../ports';

export class GetItemsQuery extends Query<IndexedItemsDTO> {
  constructor(
    public readonly q: string,
    public readonly options?: Partial<{ collections: SEARCH_COLLECTIONS[]; isGlobal: boolean }>,
  ) {
    super();
  }
}
