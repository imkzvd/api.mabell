import { Query } from '@nestjs/cqrs';
import { AdminDTO } from '../../dtos/admin.dto';
import { OffsetLimitPaginationResponseDTO } from '../../../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { OffsetLimitPaginationDTO } from '../../../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';

export class GetAdminsQuery extends Query<OffsetLimitPaginationResponseDTO<AdminDTO>> {
  constructor(public readonly pagination?: OffsetLimitPaginationDTO) {
    super();
  }
}
