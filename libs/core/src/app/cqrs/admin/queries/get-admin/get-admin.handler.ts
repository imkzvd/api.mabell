import { AdminFindService } from '@core/app/components/admin/services/admin-find.service';
import { GetAdminQuery } from '@core/app/cqrs/admin/queries/get-admin/get-admin.query';
import { QueryHandler } from '@core/app/types';

export class GetAdminHandler implements QueryHandler<GetAdminQuery> {
  constructor(private _service: AdminFindService) {}

  async execute({ id }: GetAdminQuery) {
    return this._service.find(id);
  }
}
