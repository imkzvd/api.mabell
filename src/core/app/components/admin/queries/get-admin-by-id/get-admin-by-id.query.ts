import { Query } from '@nestjs/cqrs';
import { AdminDTO } from '../dtos/admin.dto';

export class GetAdminByIdQuery extends Query<AdminDTO | null> {
  constructor(public readonly id: string) {
    super();
  }
}
