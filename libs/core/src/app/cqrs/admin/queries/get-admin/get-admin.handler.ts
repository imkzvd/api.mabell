import { AdminService } from '@core/app/components/admin/admin.service';
import { GetAdminQuery } from '@core/app/cqrs/admin/queries/get-admin/get-admin.query';
import { QueryHandler } from '@core/app/types';

export class GetAdminHandler implements QueryHandler<GetAdminQuery> {
  constructor(private _adminService: AdminService) {}

  async execute({ id }: GetAdminQuery) {
    return this._adminService.getAdmin(id);
  }
}
