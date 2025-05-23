import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAdminQuery } from './get-admin.query';
import { AdminService } from '../../admin.service';

@QueryHandler(GetAdminQuery)
export class GetAdminHandler implements IQueryHandler<GetAdminQuery> {
  constructor(@Inject(AdminService) private _adminService: AdminService) {}

  async execute({ id }: GetAdminQuery) {
    return this._adminService.getAdmin(id);
  }
}
