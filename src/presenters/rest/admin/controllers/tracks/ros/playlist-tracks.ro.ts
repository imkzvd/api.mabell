import { ApiProperty } from '@nestjs/swagger';
import { OffsetLimitPaginationRO } from '../../../../common/ros/offset-limit-pagination.ro';
import { PlaylistTrackRO } from './playlist-track.ro';
import { PlaylistTrackDTO } from '../../../../../../core/app/components/track/queries/dtos/playlist-track.dto';
import { OffsetLimitPaginationResponseDTO } from '../../../../../../core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';

export class PlaylistTracksRO extends OffsetLimitPaginationRO<PlaylistTrackRO> {
  @ApiProperty({ type: () => [PlaylistTrackRO], description: 'Items' })
  declare items: PlaylistTrackRO[];

  constructor(result: OffsetLimitPaginationResponseDTO<PlaylistTrackDTO>) {
    super(
      result.items.map((item) => new PlaylistTrackRO(item)),
      result.total,
      result.offset,
      result.limit,
      result.hasMore,
    );
  }
}
