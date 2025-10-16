import { ApiProperty } from '@nestjs/swagger';
import { App } from '@api.mabell/core';
import { OffsetLimitPaginationRO } from '@api.mabell/shared';
import { IndexedArtistRO } from './indexed-artist.ro';

export class IndexedArtistsRO extends OffsetLimitPaginationRO<IndexedArtistRO> {
  @ApiProperty({ type: () => [IndexedArtistRO], description: 'Items' })
  declare items: IndexedArtistRO[];

  constructor(dto: App.DTOs.IndexedArtistsDTO) {
    super(
      dto.items.map((item) => new IndexedArtistRO(item)),
      dto.total,
      dto.offset,
      dto.limit,
      dto.hasMore,
    );
  }
}
