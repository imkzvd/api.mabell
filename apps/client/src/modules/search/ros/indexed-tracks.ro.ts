import { ApiProperty } from '@nestjs/swagger';
import { App } from '@api.mabell/core';
import { OffsetLimitPaginationRO } from '@api.mabell/shared';
import { IndexedTrackRO } from './indexed-track.ro';

export class IndexedTracksRO extends OffsetLimitPaginationRO<IndexedTrackRO> {
  @ApiProperty({ type: () => [IndexedTrackRO], description: 'Items' })
  declare items: IndexedTrackRO[];

  constructor(dto: App.DTOs.IndexedTracksDTO) {
    super(
      dto.items.map((item) => new IndexedTrackRO(item)),
      dto.total,
      dto.offset,
      dto.limit,
      dto.hasMore,
    );
  }
}
