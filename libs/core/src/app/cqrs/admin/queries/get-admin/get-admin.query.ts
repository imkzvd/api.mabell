import { AdminDTO } from '@core/app/components/admin/dtos/admin.dto';
import { Query } from '@core/app/types';

export class GetAdminQuery extends Query<AdminDTO | null> {
  constructor(public readonly id: string) {
    super();
  }
}
