import { ApiProperty } from '@nestjs/swagger';
import { OffsetLimitPaginationRO } from '../../../../common/ros/offset-limit-pagination.ro';
import { AdminRO } from './admin.ro';
import { OffsetLimitPaginationResponseDTO } from '../../../../../../core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { AdminDTO } from '../../../../../../core/app/components/admin/dtos/admin.dto';

export class AdminsRO extends OffsetLimitPaginationRO<AdminRO> {
  @ApiProperty({ type: [AdminRO], description: 'Items' })
  declare items: AdminRO[];

  constructor(result: OffsetLimitPaginationResponseDTO<AdminDTO>) {
    super(
      result.items.map((item) => new AdminRO(item)),
      result.total,
      result.offset,
      result.limit,
      result.hasMore,
    );
  }
}
