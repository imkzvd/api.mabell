import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAdminByIdQuery } from './get-admin-by-id.query';
import {
  ADMIN_READ_REPOSITORY_DI_TOKEN,
  AdminReadRepository,
} from '../../repository/admin-read-repository.port';
import AdminMapper from '../dtos/admin.mapper';

@QueryHandler(GetAdminByIdQuery)
export class GetAdminByIdHandler implements IQueryHandler<GetAdminByIdQuery> {
  constructor(
    @Inject(ADMIN_READ_REPOSITORY_DI_TOKEN)
    private readonly _adminReadRepository: AdminReadRepository,
  ) {}

  async execute({ id }: GetAdminByIdQuery) {
    const foundAdmin = await this._adminReadRepository.findById(id);

    return foundAdmin ? AdminMapper.toDTO(foundAdmin) : null;
  }
}
