import { ApiProperty } from '@nestjs/swagger';
import { OffsetLimitPaginationResponseDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';

export class OffsetLimitPaginationRO<T extends Record<string, any>>
  implements OffsetLimitPaginationResponseDTO<T>
{
  @ApiProperty({ type: Array, description: 'Items' })
  public items: T[];

  @ApiProperty({ type: Number, description: 'Total', example: 1000 })
  total: number;

  @ApiProperty({ type: Number, description: 'Offset', example: 0 })
  offset: number;

  @ApiProperty({ type: Number, description: 'Limit', example: 25 })
  limit: number;

  @ApiProperty({ type: Boolean, description: 'Has More', example: true })
  hasMore: boolean;

  constructor(
    items: T[] = [],
    total: number = 0,
    offset: number = 0,
    limit: number = 50,
    hasMore: boolean = false,
  ) {
    this.items = items;
    this.total = total;
    this.offset = offset;
    this.limit = limit;
    this.hasMore = hasMore;
  }
}
