import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAdminByIdQuery } from './get-admin-by-id.query';
import {
  ADMIN_READ_REPOSITORY_DI_TOKEN,
  AdminReadRepository,
} from '../../repository/admin-read-repository.port';

@QueryHandler(GetAdminByIdQuery)
export class GetAdminByIdHandler implements IQueryHandler<GetAdminByIdQuery> {
  constructor(
    @Inject(ADMIN_READ_REPOSITORY_DI_TOKEN)
    private readonly _adminReadRepository: AdminReadRepository,
  ) {}

  async execute({ id }: GetAdminByIdQuery) {
    return this._adminReadRepository.findById(id);
  }
}
