import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAdminQuery } from '@core/app/cqrs/admin/queries/get-admin/get-admin.query';
import { GetAdminHandler as CoreGetAdminHandler } from '@core/app/cqrs/admin/queries/get-admin/get-admin.handler';
import { AdminFindService } from '@core/app/components/admin/services/admin-find.service';

@QueryHandler(GetAdminQuery)
export class GetAdminHandler extends CoreGetAdminHandler {
  constructor(@Inject(AdminFindService) service: AdminFindService) {
    super(service);
  }
}
