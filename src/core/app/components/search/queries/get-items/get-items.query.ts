import { Query } from '@nestjs/cqrs';
import { IndexedItemsDTO } from '../../ports/search-service/dtos/indexed-items.dto';

export class GetItemsQuery extends Query<IndexedItemsDTO> {
  constructor(public readonly q: string) {
    super();
  }
}
