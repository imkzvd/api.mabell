import { Query } from '@core/app/types';
import { IndexedItemsDTO } from '@core/app/common/ports/search-service/dtos/indexed-items.dto';

export class GetItemsQuery extends Query<IndexedItemsDTO> {
  constructor(public readonly q: string) {
    super();
  }
}
