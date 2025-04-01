import { ApiProperty } from '@nestjs/swagger';
import { OffsetLimitPaginationRO } from '../../../../common/ros/offset-limit-pagination.ro';
import { SimplifiedUserRO } from './simplified-user.ro';
import { OffsetLimitPaginationResponseDTO } from '../../../../../../core/app/common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { SimplifiedUserDTO } from '../../../../../../core/app/components/user/dtos/simplified-user.dto';

export class UsersRO extends OffsetLimitPaginationRO<SimplifiedUserRO> {
  @ApiProperty({ type: [SimplifiedUserRO], description: 'Items' })
  declare items: SimplifiedUserRO[];

  constructor(result: OffsetLimitPaginationResponseDTO<SimplifiedUserDTO>) {
    super({
      ...result,
      items: result.items.map((item) => new SimplifiedUserRO(item)),
    });
  }
}
