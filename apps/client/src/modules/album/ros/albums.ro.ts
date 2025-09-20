import { ApiProperty } from '@nestjs/swagger';
import { App } from '@api.mabell/core';
import { OffsetLimitPaginationRO } from '@api.mabell/shared';
import { AlbumRO } from './album.ro';

export class AlbumsRO extends OffsetLimitPaginationRO<AlbumRO> {
  @ApiProperty({ type: () => [AlbumRO], description: 'Items' })
  declare items: AlbumRO[];

  constructor(result: App.DTOs.AlbumsDTO) {
    super(
      result.items.map((item) => new AlbumRO(item)),
      result.total,
      result.offset,
      result.limit,
      result.hasMore,
    );
  }
}
