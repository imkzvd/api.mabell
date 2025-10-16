import { Query } from '../../../../types';
import { IndexedUsersDTO } from '../../../../dtos';

export class GetUsersQuery extends Query<IndexedUsersDTO> {
  constructor(public readonly q: string) {
    super();
  }
}
