import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AdminService } from '@core/app/components/admin/admin.service';
import { GetAdminsQuery } from '@core/app/cqrs/admin/queries/get-admins/get-admins.query';
import { GetAdminsHandler as CoreGetAdminsHandler } from '@core/app/cqrs/admin/queries/get-admins/get-admins.handler';
import { Inject } from '@nestjs/common';

@QueryHandler(GetAdminsQuery)
export class GetAdminsHandler implements IQueryHandler<GetAdminsQuery> {
  private readonly coreHandler: CoreGetAdminsHandler;

  constructor(@Inject(AdminService) service: AdminService) {
    this.coreHandler = new CoreGetAdminsHandler(service);
  }

  async execute(query: GetAdminsQuery) {
    return this.coreHandler.execute(query);
  }
}
