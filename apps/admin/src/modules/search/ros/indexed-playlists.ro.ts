import { ApiProperty } from '@nestjs/swagger';
import { App } from '@api.mabell/core';
import { OffsetLimitPaginationRO } from '@api.mabell/shared';
import { IndexedPlaylistRO } from './indexed-playlist.ro';

export class IndexedPlaylistsRO extends OffsetLimitPaginationRO<IndexedPlaylistRO> {
  @ApiProperty({ type: () => [IndexedPlaylistRO], description: 'Items' })
  declare items: IndexedPlaylistRO[];

  constructor(dto: App.DTOs.IndexedPlaylistsDTO) {
    super(
      dto.items.map((item) => new IndexedPlaylistRO(item)),
      dto.total,
      dto.offset,
      dto.limit,
      dto.hasMore,
    );
  }
}
