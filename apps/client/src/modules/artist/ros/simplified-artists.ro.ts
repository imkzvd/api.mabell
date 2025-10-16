import { ApiProperty } from '@nestjs/swagger';
import { App } from '@api.mabell/core';
import { OffsetLimitPaginationRO } from '@api.mabell/shared';
import { SimplifiedArtistRO } from './simplified-artist.ro';

export class SimplifiedArtistsRO extends OffsetLimitPaginationRO<SimplifiedArtistRO> {
  @ApiProperty({ type: () => [SimplifiedArtistRO], description: 'Items' })
  declare items: SimplifiedArtistRO[];

  constructor(result: App.DTOs.ArtistsDTO) {
    super(
      result.items.map((item) => new SimplifiedArtistRO(item)),
      result.total,
      result.offset,
      result.limit,
      result.hasMore,
    );
  }
}
