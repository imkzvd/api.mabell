import { ApiProperty } from '@nestjs/swagger';
import { OffsetLimitPaginationRO } from '../../../../common/ros/offset-limit-pagination.ro';
import { OffsetLimitPaginationResponseDTO } from '../../../../../../core/app/common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { TrackRO } from './track.ro';
import { TrackDTO } from '../../../../../../core/app/components/track/dtos/track.dto';

export class TracksRO extends OffsetLimitPaginationRO<TrackRO> {
  @ApiProperty({ type: () => [TrackRO], description: 'Items' })
  declare items: TrackRO[];

  constructor(result: OffsetLimitPaginationResponseDTO<TrackDTO>) {
    super({
      ...result,
      items: result.items.map((item) => new TrackRO(item)),
    });
  }
}
