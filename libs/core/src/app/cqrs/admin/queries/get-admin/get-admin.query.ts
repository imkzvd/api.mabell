import { Query } from '@nestjs/cqrs';
import { AdminDTO } from '../../../../components/admin/dtos/admin.dto';

export class GetAdminQuery extends Query<AdminDTO | null> {
  constructor(public readonly id: string) {
    super();
  }
}
