import { OffsetLimitPaginationResponseDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { OffsetLimitPaginationDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { AdminReadRepository } from '@core/domain/components/admin/repository/admin-read-repository.port';
import AdminMapper from '../dtos/admin.mapper';
import { AdminDTO } from '../dtos/admin.dto';

export class AdminFindService {
  constructor(private readonly _RR: AdminReadRepository) {}

  async find(id: string): Promise<AdminDTO | null> {
    const foundAdmin = await this._RR.findById(id);

    return foundAdmin ? AdminMapper.toDTO(foundAdmin) : null;
  }

  async findAll(
    pagination?: OffsetLimitPaginationDTO,
  ): Promise<OffsetLimitPaginationResponseDTO<AdminDTO>> {
    const foundAdmins = await this._RR.find({
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
