import { QueryHandler } from '@nestjs/cqrs';
import { AdminService } from '@core/app/components/admin/admin.service';
import { GetAdminsQuery } from '@core/app/cqrs/admin/queries/get-admins/get-admins.query';
import { GetAdminsHandler as CoreGetAdminsHandler } from '@core/app/cqrs/admin/queries/get-admins/get-admins.handler';
import { Inject } from '@nestjs/common';

@QueryHandler(GetAdminsQuery)
export class GetAdminsHandler extends CoreGetAdminsHandler {
  constructor(@Inject(AdminService) service: AdminService) {
    super(service);
  }
}
