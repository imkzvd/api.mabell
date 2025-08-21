import { Query } from '../../../../types';
import { AdminDTO } from '../../../../dtos';

export class GetAdminQuery extends Query<AdminDTO | null> {
  constructor(public readonly id: string) {
    super();
  }
}
