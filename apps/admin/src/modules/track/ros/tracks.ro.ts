import { ApiProperty } from '@nestjs/swagger';
import { OffsetLimitPaginationRO } from '@shared/ros/offset-limit-pagination.ro';
import { OffsetLimitPaginationResponseDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { TrackDTO } from '@core/app/components/track/dtos/track.dto';
import { TrackRO } from './track.ro';

export class TracksRO extends OffsetLimitPaginationRO<TrackRO> {
  @ApiProperty({ type: () => [TrackRO], description: 'Items' })
  declare items: TrackRO[];

  constructor(result: OffsetLimitPaginationResponseDTO<TrackDTO>) {
    super(
      result.items.map((item) => new TrackRO(item)),
      result.total,
      result.offset,
      result.limit,
      result.hasMore,
    );
  }
}
