import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAdminsQuery } from './get-admins.query';
import AdminMapper from '../dtos/admin.mapper';
import {
  ADMIN_READ_REPOSITORY_DI_TOKEN,
  AdminReadRepository,
} from '../../../../../domain/components/admin/repository/admin-read-repository.port';
import { OffsetLimitPaginationResponseDTO } from '../../../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';

@QueryHandler(GetAdminsQuery)
export class GetAdminsHandler implements IQueryHandler<GetAdminsQuery> {
  constructor(
    @Inject(ADMIN_READ_REPOSITORY_DI_TOKEN)
    private readonly _adminReadRepository: AdminReadRepository,
  ) {}

  async execute({ pagination }: GetAdminsQuery) {
    const foundAdmins = await this._adminReadRepository.find({
      pagination,
    });

    return new OffsetLimitPaginationResponseDTO(
      foundAdmins.items.map((dto) => AdminMapper.toDTO(dto)),
      foundAdmins.total,
      foundAdmins.limit,
      foundAdmins.offset,
      foundAdmins.hasMore,
    );
  }
}
