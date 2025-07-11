import { QueryHandler } from '@core/app/types';
import { GetUsersQuery } from '@core/app/cqrs/search/queries/get-users/get-users.query';
import { SearchService } from '@core/app/common/ports/search-service/search-service.port';

export class GetUsersHandler implements QueryHandler<GetUsersQuery> {
  constructor(private readonly _service: SearchService) {}

  async execute({ q }: GetUsersQuery) {
    return this._service.findUsersByKey(q);
  }
}
