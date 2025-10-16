import { ApiProperty } from '@nestjs/swagger';
import { App } from '@api.mabell/core';
import { OffsetLimitPaginationRO } from '@api.mabell/shared';
import { IndexedAlbumRO } from './indexed-album.ro';

export class IndexedAlbumsRO extends OffsetLimitPaginationRO<IndexedAlbumRO> {
  @ApiProperty({ type: () => [IndexedAlbumRO], description: 'Items' })
  declare items: IndexedAlbumRO[];

  constructor(dto: App.DTOs.IndexedAlbumsDTO) {
    super(
      dto.items.map((item) => new IndexedAlbumRO(item)),
      dto.total,
      dto.offset,
      dto.limit,
      dto.hasMore,
    );
  }
}
