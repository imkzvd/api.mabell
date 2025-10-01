import { QueryHandler } from '../../../../types';
import { GetItemsQuery } from './get-items.query';
import { SearchService } from '../../../../ports';

export class GetItemsHandler implements QueryHandler<GetItemsQuery> {
  constructor(private readonly _service: SearchService) {}

  execute({ q, options }: GetItemsQuery) {
    return this._service.find(q, options);
  }
}
