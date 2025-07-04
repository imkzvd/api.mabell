import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAdminQuery } from '@core/app/cqrs/admin/queries/get-admin/get-admin.query';
import { GetAdminHandler as CoreGetAdminHandler } from '@core/app/cqrs/admin/queries/get-admin/get-admin.handler';
import { AdminService } from '@core/app/components/admin/admin.service';

@QueryHandler(GetAdminQuery)
export class GetAdminHandler extends CoreGetAdminHandler {
  constructor(@Inject(AdminService) service: AdminService) {
    super(service);
  }
}
