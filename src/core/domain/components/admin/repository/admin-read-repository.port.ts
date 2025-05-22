import { AdminDTO } from './dtos/admin.dto';
import { OffsetLimitPaginationDTO } from '../../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { OffsetLimitPaginationResponseDTO } from '../../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';

export const ADMIN_READ_REPOSITORY_DI_TOKEN = Symbol('ADMIN_READ_REPOSITORY_DI_TOKEN');

export interface AdminReadRepository {
  findById(id: string): Promise<AdminDTO | null>;

  find(
    options?: Partial<{
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<AdminDTO>>;
}
