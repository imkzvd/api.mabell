import { ApiProperty } from '@nestjs/swagger';
import { OffsetLimitPaginationRO } from '../../../../common/ros/offset-limit-pagination.ro';
import { SimplifiedAdminRO } from './simplified-admin.ro';
import { OffsetLimitPaginationResponseDTO } from '../../../../../../core/app/common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { SimplifiedAdminDTO } from '../../../../../../core/app/components/admin/dtos/simplified-admin.dto';

export class AdminsRO extends OffsetLimitPaginationRO<SimplifiedAdminRO> {
  @ApiProperty({ type: [SimplifiedAdminRO], description: 'Items' })
  declare items: SimplifiedAdminRO[];

  constructor(result: OffsetLimitPaginationResponseDTO<SimplifiedAdminDTO>) {
    super({
      ...result,
      items: result.items.map((item) => new SimplifiedAdminRO(item)),
    });
  }
}
