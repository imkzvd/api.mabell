import { QueryHandler } from '../../../../types';
import { GetAdminsQuery } from './get-admins.query';
import { AdminService } from '../../../../components/admin';

export class GetAdminsHandler implements QueryHandler<GetAdminsQuery> {
  constructor(private _service: AdminService) {}

  async execute({ options }: GetAdminsQuery) {
    return this._service.find({
      pagination: options?.pagination,
    });
  }
}
