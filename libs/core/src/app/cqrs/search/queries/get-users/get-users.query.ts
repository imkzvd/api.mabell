import { Query } from '@core/app/types';
import { IndexedUserDTO } from '@core/app/common/ports/search-service/dtos/indexed-user.dto';

export class GetUsersQuery extends Query<IndexedUserDTO[]> {
  constructor(public readonly q: string) {
    super();
  }
}
