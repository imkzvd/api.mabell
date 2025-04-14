import { ApiProperty } from '@nestjs/swagger';
import { OffsetLimitPaginationRO } from '../../../../common/ros/offset-limit-pagination.ro';
import { OffsetLimitPaginationResponseDTO } from '../../../../../../core/app/common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { SimplifiedTrackRO } from './simplified-track.ro';
import { SimplifiedTrackDTO } from '../../../../../../core/app/components/track/dtos/simplified-track.dto';

export class SimplifiedTracksRO extends OffsetLimitPaginationRO<SimplifiedTrackRO> {
  @ApiProperty({ type: () => [SimplifiedTrackRO], description: 'Items' })
  declare items: SimplifiedTrackRO[];

  constructor(result: OffsetLimitPaginationResponseDTO<SimplifiedTrackDTO>) {
    super({
      ...result,
      items: result.items.map((item) => new SimplifiedTrackRO(item)),
    });
  }
}
