import { Query } from '@nestjs/cqrs';
import { IndexedUserDTO } from '../../ports/search-service/dtos/indexed-user.dto';

export class GetUsersQuery extends Query<IndexedUserDTO[]> {
  constructor(public readonly q: string) {
    super();
  }
}
