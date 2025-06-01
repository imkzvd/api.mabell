import { ApiProperty } from '@nestjs/swagger';
import { OffsetLimitPaginationRO } from '../../../../common/ros/offset-limit-pagination.ro';
import { PlaylistRO } from './playlist.ro';
import { OffsetLimitPaginationResponseDTO } from '../../../../../../core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { PlaylistDTO } from '../../../../../../core/app/components/playlist/dtos/playlist.dto';

export class PlaylistsRO extends OffsetLimitPaginationRO<PlaylistRO> {
  @ApiProperty({ type: () => [PlaylistRO], description: 'Items' })
  declare items: PlaylistRO[];

  constructor(result: OffsetLimitPaginationResponseDTO<PlaylistDTO>) {
    super(
      result.items.map((item) => new PlaylistRO(item)),
      result.total,
      result.offset,
      result.limit,
      result.hasMore,
    );
  }
}
