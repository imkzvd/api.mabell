import { ApiProperty } from '@nestjs/swagger';
import { OffsetLimitPaginationRO } from '@shared/ros/offset-limit-pagination.ro';
import { OffsetLimitPaginationResponseDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { AdminDTO } from '@core/app/components/admin/dtos/admin.dto';
import { AdminRO } from './admin.ro';

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
