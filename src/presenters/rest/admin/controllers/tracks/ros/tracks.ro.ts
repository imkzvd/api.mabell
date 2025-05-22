import { ApiProperty } from '@nestjs/swagger';
import { OffsetLimitPaginationRO } from '../../../../common/ros/offset-limit-pagination.ro';
import { TrackRO } from './track.ro';
import { TrackDTO } from '../../../../../../core/app/components/track/queries/dtos/track.dto';
import { OffsetLimitPaginationResponseDTO } from '../../../../../../core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';

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
