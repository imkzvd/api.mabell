import { Query } from '@nestjs/cqrs';
import { OffsetLimitPaginationResponseDTO } from '../../../../common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { OffsetLimitPaginationDTO } from '../../../../common/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { UserDTO } from '../dtos/user.dto';

export class GetUsersQuery extends Query<OffsetLimitPaginationResponseDTO<UserDTO>> {
  constructor(public readonly pagination?: OffsetLimitPaginationDTO) {
    super();
  }
}
