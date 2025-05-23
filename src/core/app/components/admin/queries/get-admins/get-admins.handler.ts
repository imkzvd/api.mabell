import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAdminsQuery } from './get-admins.query';
import { AdminService } from '../../admin.service';

@QueryHandler(GetAdminsQuery)
export class GetAdminsHandler implements IQueryHandler<GetAdminsQuery> {
  constructor(@Inject(AdminService) private _adminService: AdminService) {}

  async execute({ pagination }: GetAdminsQuery) {
    return this._adminService.getAdmins(pagination);
  }
}
