import { QueryHandler } from '@nestjs/cqrs';
import { AdminService } from '@core/app/components/admin/services/admin.service';
import { GetAdminsQuery } from '@core/app/cqrs/admin/queries/get-admins/get-admins.query';
import { GetAdminsHandler as CoreGetAdminsHandler } from '@core/app/cqrs/admin/queries/get-admins/get-admins.handler';

@QueryHandler(GetAdminsQuery)
export class GetAdminsHandler extends CoreGetAdminsHandler {
  constructor(service: AdminService) {
    super(service);
  }
}
