import { ApiProperty } from '@nestjs/swagger';
import { App } from '@api.mabell/core';
import { OffsetLimitPaginationRO } from '@api.mabell/shared';
import { PlaylistRO } from './playlist.ro';

export class PlaylistsRO extends OffsetLimitPaginationRO<PlaylistRO> {
  @ApiProperty({ type: () => [PlaylistRO], description: 'Items' })
  declare items: PlaylistRO[];

  constructor(result: App.DTOs.PlaylistsDTO) {
    super(
      result.items.map((item) => new PlaylistRO(item)),
      result.total,
      result.offset,
      result.limit,
      result.hasMore,
    );
  }
}
