import { QueryHandler } from '../../../../types';
import { GetUsersQuery } from './get-users.query';
import { SearchService } from '../../../../ports';

export class GetUsersHandler implements QueryHandler<GetUsersQuery> {
  constructor(private readonly _service: SearchService) {}

  execute({ q }: GetUsersQuery) {
    return this._service.findUsers(q);
  }
}
