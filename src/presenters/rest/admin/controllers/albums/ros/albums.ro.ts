import { ApiProperty } from '@nestjs/swagger';
import { OffsetLimitPaginationRO } from '../../../../common/ros/offset-limit-pagination.ro';
import { AlbumRO } from './album.ro';
import { AlbumDTO } from '../../../../../../core/app/components/album/queries/dtos/album.dto';
import { OffsetLimitPaginationResponseDTO } from '../../../../../../core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';

export class AlbumsRO extends OffsetLimitPaginationRO<AlbumRO> {
  @ApiProperty({ type: () => [AlbumRO], description: 'Items' })
  declare items: AlbumRO[];

  constructor(result: OffsetLimitPaginationResponseDTO<AlbumDTO>) {
    super(
      result.items.map((item) => new AlbumRO(item)),
      result.total,
      result.offset,
      result.limit,
      result.hasMore,
    );
  }
}
