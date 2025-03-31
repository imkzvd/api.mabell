import { ApiProperty } from '@nestjs/swagger';
import { OffsetLimitPaginationResponseDTO } from '../../../../core/app/common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';

export class OffsetLimitPaginationRO<T extends Record<string, any>>
  implements OffsetLimitPaginationResponseDTO<T>
{
  public items: T[];

  @ApiProperty({ type: Number, description: 'Total', example: 1000 })
  total: number;

  @ApiProperty({ type: Number, description: 'Offset', example: 0 })
  offset: number;

  @ApiProperty({ type: Number, description: 'Limit', example: 25 })
  limit: number;

  @ApiProperty({ type: Boolean, description: 'Has More', example: true })
  hasMore: boolean;

  constructor(result: OffsetLimitPaginationResponseDTO<T>) {
    this.items = result.items;
    this.total = result.total;
    this.offset = result.offset;
    this.limit = result.limit;
    this.hasMore = result.hasMore;
  }
}
