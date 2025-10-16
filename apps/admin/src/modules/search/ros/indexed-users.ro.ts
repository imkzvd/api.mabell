import { ApiProperty } from '@nestjs/swagger';
import { App } from '@api.mabell/core';
import { OffsetLimitPaginationRO } from '@api.mabell/shared';
import { IndexedUserRO } from './indexed-user.ro';

export class IndexedUsersRO extends OffsetLimitPaginationRO<IndexedUserRO> {
  @ApiProperty({ type: () => [IndexedUserRO], description: 'Items' })
  declare items: IndexedUserRO[];

  constructor(dto: App.DTOs.IndexedUsersDTO) {
    super(
      dto.items.map((item) => new IndexedUserRO(item)),
      dto.total,
      dto.offset,
      dto.limit,
      dto.hasMore,
    );
  }
}
