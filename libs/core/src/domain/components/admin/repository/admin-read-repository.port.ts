import { AdminDTO } from './dtos/admin.dto';
import { OffsetLimitPaginationDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { OffsetLimitPaginationResponseDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';

export interface AdminReadRepository {
  findById(id: string): Promise<AdminDTO | null>;

  findByUsername(username: string): Promise<AdminDTO | null>;

  find(
    options?: Partial<{
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<AdminDTO>>;
}
