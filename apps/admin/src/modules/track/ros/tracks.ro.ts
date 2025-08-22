import { ApiProperty } from '@nestjs/swagger';
import { App } from '@api.mabell/core';
import { OffsetLimitPaginationRO } from '@api.mabell/shared';
import { TrackRO } from './track.ro';

export class TracksRO extends OffsetLimitPaginationRO<TrackRO> {
  @ApiProperty({ type: () => [TrackRO], description: 'Items' })
  declare items: TrackRO[];

  constructor(result: App.DTOs.TracksDTO) {
    super(
      result.items.map((item) => new TrackRO(item)),
      result.total,
      result.offset,
      result.limit,
      result.hasMore,
    );
  }
}
