import { QueryHandler } from '../../../../types';
import { GetAdminQuery } from './get-admin.query';
import { AdminService } from '../../../../components/admin';

export class GetAdminHandler implements QueryHandler<GetAdminQuery> {
  constructor(private _service: AdminService) {}

  execute({ id }: GetAdminQuery) {
    return this._service.findById(id);
  }
}
