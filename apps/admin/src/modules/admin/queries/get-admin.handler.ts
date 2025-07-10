import { QueryHandler } from '@nestjs/cqrs';
import { GetAdminQuery } from '@core/app/cqrs/admin/queries/get-admin/get-admin.query';
import { GetAdminHandler as CoreGetAdminHandler } from '@core/app/cqrs/admin/queries/get-admin/get-admin.handler';
import { AdminService } from '@core/app/components/admin/services/admin.service';

@QueryHandler(GetAdminQuery)
export class GetAdminHandler extends CoreGetAdminHandler {
  constructor(service: AdminService) {
    super(service);
  }
}
