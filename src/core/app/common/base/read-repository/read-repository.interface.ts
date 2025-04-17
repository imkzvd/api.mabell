import { OffsetLimitPaginationDTO } from '../../dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { OffsetLimitPaginationResponseDTO } from '../../dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { QueryFilter } from '../../../../domain/common/repository/query-filter.abstract';

export interface ReadRepository<
  DTO extends Record<string, any>,
  Filter extends QueryFilter = QueryFilter,
  WithRelationsDTO extends Record<string, any> = DTO,
> {
  findById<WithRelations extends boolean = false>(
    id: string,
    withRelations?: WithRelations,
  ): Promise<(WithRelations extends true ? WithRelationsDTO : DTO) | null>;
  findByIds<WithRelations extends boolean = false>(
    ids: string[],
    withRelations?: WithRelations,
  ): Promise<{
    items: (WithRelations extends true ? WithRelationsDTO : DTO)[];
    foundIds: string[];
    missingIds: string[];
  }>;
  find<WithRelations extends boolean = false>(
    options?: Partial<{
      filter: Filter;
      withRelations: WithRelations;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<WithRelations extends true ? WithRelationsDTO : DTO>>;
}
