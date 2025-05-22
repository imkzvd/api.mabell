import { ApiProperty } from '@nestjs/swagger';
import { OffsetLimitPaginationRO } from '../../../../common/ros/offset-limit-pagination.ro';
import { UserDTO } from '../../../../../../core/app/components/user/queries/dtos/user.dto';
import { UserRO } from './user.ro';
import { OffsetLimitPaginationResponseDTO } from '../../../../../../core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';

export class UsersRO extends OffsetLimitPaginationRO<UserRO> {
  @ApiProperty({ type: [UserRO], description: 'Items' })
  declare items: UserRO[];

  constructor(result: OffsetLimitPaginationResponseDTO<UserDTO>) {
    super(
      result.items.map((item) => new UserRO(item)),
      result.total,
      result.offset,
      result.limit,
      result.hasMore,
    );
  }
}
