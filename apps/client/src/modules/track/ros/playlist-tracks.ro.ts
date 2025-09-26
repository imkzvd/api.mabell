import { ApiProperty } from '@nestjs/swagger';
import { App } from '@api.mabell/core';
import { OffsetLimitPaginationRO } from '@api.mabell/shared';
import { PlaylistTrackRO } from './playlist-track.ro';

export class PlaylistTracksRO extends OffsetLimitPaginationRO<PlaylistTrackRO> {
  @ApiProperty({ type: () => [PlaylistTrackRO], description: 'Items' })
  declare items: PlaylistTrackRO[];

  constructor(result: App.DTOs.PlaylistTracksDTO) {
    super(
      // @ts-expect-error todo: fix!
      result.items.filter((i) => i.track).map((i) => new PlaylistTrackRO(i.track, i.addedAt)),
      result.total,
      result.offset,
      result.limit,
      result.hasMore,
    );
  }
}
