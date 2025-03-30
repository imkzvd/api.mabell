import { OffsetLimitPaginationDTO } from '../../dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { OffsetLimitPaginationResponseDTO } from '../../dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { QueryFilter } from '../../../../domain/common/repository/query-filter.abstract';

export interface ReadRepository<DTO, SimplifiedDTO, Filter extends QueryFilter> {
  findById(id: string): Promise<DTO | null>;
  findByIds(ids: string[]): Promise<{
    items: DTO[];
    foundIds: string[];
    missingIds: string[];
  }>;
  find(
    options?: Partial<{
      filter: Filter;
      pagination: OffsetLimitPaginationDTO;
      projection: Partial<Record<keyof SimplifiedDTO, 0 | 1>>;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<SimplifiedDTO>>;
}
