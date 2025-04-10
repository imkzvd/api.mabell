import { ApiProperty } from '@nestjs/swagger';
import { OffsetLimitPaginationRO } from '../../../../common/ros/offset-limit-pagination.ro';
import { OffsetLimitPaginationResponseDTO } from '../../../../../../core/app/common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { SimplifiedAlbumRO } from './simplified-album.ro';
import { SimplifiedAlbumDTO } from '../../../../../../core/app/components/album/dtos/simplified-album.dto';

export class AlbumsRO extends OffsetLimitPaginationRO<SimplifiedAlbumRO> {
  @ApiProperty({ type: () => [SimplifiedAlbumRO], description: 'Items' })
  declare items: SimplifiedAlbumRO[];

  constructor(result: OffsetLimitPaginationResponseDTO<SimplifiedAlbumDTO>) {
    super({
      ...result,
      items: result.items.map((item) => new SimplifiedAlbumRO(item)),
    });
  }
}
