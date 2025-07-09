import { QueryHandler } from '@nestjs/cqrs';
import { AdminFindService } from '@core/app/components/admin/services/admin-find.service';
import { GetAdminsQuery } from '@core/app/cqrs/admin/queries/get-admins/get-admins.query';
import { GetAdminsHandler as CoreGetAdminsHandler } from '@core/app/cqrs/admin/queries/get-admins/get-admins.handler';
import { Inject } from '@nestjs/common';

@QueryHandler(GetAdminsQuery)
export class GetAdminsHandler extends CoreGetAdminsHandler {
  constructor(@Inject(AdminFindService) service: AdminFindService) {
    super(service);
  }
}
