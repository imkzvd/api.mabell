import { Query } from '@core/app/types';
import { OffsetLimitPaginationResponseDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { OffsetLimitPaginationDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { AdminDTO } from '@core/app/components/admin/dtos/admin.dto';

export class GetAdminsQuery extends Query<OffsetLimitPaginationResponseDTO<AdminDTO>> {
  constructor(public readonly pagination?: OffsetLimitPaginationDTO) {
    super();
  }
}
