import { ApiProperty } from '@nestjs/swagger';
import { OffsetLimitPaginationRO } from '../../../../common/ros/offset-limit-pagination.ro';
import { ArtistRO } from './artist.ro';
import { ArtistDTO } from '../../../../../../core/app/components/artist/queries/dtos/artist.dto';
import { OffsetLimitPaginationResponseDTO } from '../../../../../../core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';

export class ArtistsRO extends OffsetLimitPaginationRO<ArtistRO> {
  @ApiProperty({ type: [ArtistRO], description: 'Items' })
  declare items: ArtistRO[];

  constructor(result: OffsetLimitPaginationResponseDTO<ArtistDTO>) {
    super(
      result.items.map((item) => new ArtistRO(item)),
      result.total,
      result.offset,
      result.limit,
      result.hasMore,
    );
  }
}
