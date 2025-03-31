import { Query } from '@nestjs/cqrs';
import { OffsetLimitPaginationResponseDTO } from '../../../../common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { SimplifiedAdminDTO } from '../../dtos/simplified-admin.dto';
import { OffsetLimitPaginationDTO } from '../../../../common/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';

export class GetAdminsQuery extends Query<OffsetLimitPaginationResponseDTO<SimplifiedAdminDTO>> {
  constructor(public readonly pagination?: OffsetLimitPaginationDTO) {
    super();
  }
}
