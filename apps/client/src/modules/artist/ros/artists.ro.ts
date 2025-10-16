import { ApiProperty } from '@nestjs/swagger';
import { App } from '@api.mabell/core';
import { OffsetLimitPaginationRO } from '@api.mabell/shared';
import { ArtistRO } from './artist.ro';

export class ArtistsRO extends OffsetLimitPaginationRO<ArtistRO> {
  @ApiProperty({ type: () => [ArtistRO], description: 'Items' })
  declare items: ArtistRO[];

  constructor(result: App.DTOs.ArtistsDTO) {
    super(
      result.items.map((item) => new ArtistRO(item)),
      result.total,
      result.offset,
      result.limit,
      result.hasMore,
    );
  }
}
