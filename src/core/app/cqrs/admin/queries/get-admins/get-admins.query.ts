import { Query } from '@nestjs/cqrs';
import { OffsetLimitPaginationResponseDTO } from '../../../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { OffsetLimitPaginationDTO } from '../../../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { AdminDTO } from '../../../../components/admin/dtos/admin.dto';

export class GetAdminsQuery extends Query<OffsetLimitPaginationResponseDTO<AdminDTO>> {
  constructor(public readonly pagination?: OffsetLimitPaginationDTO) {
    super();
  }
}
