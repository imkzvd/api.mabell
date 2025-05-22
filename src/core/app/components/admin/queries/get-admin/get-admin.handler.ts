import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAdminQuery } from './get-admin.query';
import AdminMapper from '../dtos/admin.mapper';
import {
  ADMIN_READ_REPOSITORY_DI_TOKEN,
  AdminReadRepository,
} from '../../../../../domain/components/admin/repository/admin-read-repository.port';

@QueryHandler(GetAdminQuery)
export class GetAdminHandler implements IQueryHandler<GetAdminQuery> {
  constructor(
    @Inject(ADMIN_READ_REPOSITORY_DI_TOKEN)
    private readonly _adminReadRepository: AdminReadRepository,
  ) {}

  async execute({ id }: GetAdminQuery) {
    const foundAdmin = await this._adminReadRepository.findById(id);

    return foundAdmin ? AdminMapper.toDTO(foundAdmin) : null;
  }
}
