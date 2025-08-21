import { ApiProperty } from '@nestjs/swagger';
import { App } from '@api.mabell/core';
import { OffsetLimitPaginationRO } from '@api.mabell/shared';
import { AdminRO } from './admin.ro';

export class AdminsRO extends OffsetLimitPaginationRO<AdminRO> {
  @ApiProperty({ type: [AdminRO], description: 'Items' })
  declare items: AdminRO[];

  constructor(result: App.DTOs.AdminsDTO) {
    super(
      result.items.map((item) => new AdminRO(item)),
      result.total,
      result.offset,
      result.limit,
      result.hasMore,
    );
  }
}
