import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAdminsQuery } from './get-admins.query';
import {
  ADMIN_READ_REPOSITORY_DI_TOKEN,
  AdminReadRepository,
} from '../../repository/admin-read-repository.port';

@QueryHandler(GetAdminsQuery)
export class GetAdminsHandler implements IQueryHandler<GetAdminsQuery> {
  constructor(
    @Inject(ADMIN_READ_REPOSITORY_DI_TOKEN)
    private readonly _adminReadRepository: AdminReadRepository,
  ) {}

  async execute({ pagination }: GetAdminsQuery) {
    return this._adminReadRepository.find({
      pagination,
    });
  }
}
