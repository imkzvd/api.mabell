import { AdminService } from '@core/app/components/admin/admin.service';
import { QueryHandler } from '@core/app/types';
import { GetAdminsQuery } from '@core/app/cqrs/admin/queries/get-admins/get-admins.query';

export class GetAdminsHandler implements QueryHandler<GetAdminsQuery> {
  constructor(private _adminService: AdminService) {}

  async execute({ pagination }: GetAdminsQuery) {
    return this._adminService.getAdmins(pagination);
  }
}
