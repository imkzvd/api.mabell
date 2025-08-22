import { Query } from '../../../../types';
import { IndexedUserDTO } from '../../../../dtos';

export class GetUsersQuery extends Query<IndexedUserDTO[]> {
  constructor(public readonly q: string) {
    super();
  }
}
