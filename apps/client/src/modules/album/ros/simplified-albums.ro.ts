import { ApiProperty } from '@nestjs/swagger';
import { App } from '@api.mabell/core';
import { OffsetLimitPaginationRO } from '@api.mabell/shared';
import { SimplifiedAlbumRO } from './simplified-album.ro';

export class SimplifiedAlbumsRO extends OffsetLimitPaginationRO<SimplifiedAlbumRO> {
  @ApiProperty({ type: () => [SimplifiedAlbumRO], description: 'Items' })
  declare items: SimplifiedAlbumRO[];

  constructor(result: App.DTOs.AlbumsDTO) {
    super(
      result.items.map((item) => new SimplifiedAlbumRO(item)),
      result.total,
      result.offset,
      result.limit,
      result.hasMore,
    );
  }
}
