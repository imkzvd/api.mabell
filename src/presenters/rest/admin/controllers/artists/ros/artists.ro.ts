import { ApiProperty } from '@nestjs/swagger';
import { OffsetLimitPaginationRO } from '../../../../common/ros/offset-limit-pagination.ro';
import { OffsetLimitPaginationResponseDTO } from '../../../../../../core/app/common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { SimplifiedArtistRO } from './simplified-artist.ro';
import { SimplifiedArtistDTO } from '../../../../../../core/app/components/artist/dtos/simplified-artist.dto';

export class ArtistsRO extends OffsetLimitPaginationRO<SimplifiedArtistRO> {
  @ApiProperty({ type: [SimplifiedArtistRO], description: 'Items' })
  declare items: SimplifiedArtistRO[];

  constructor(result: OffsetLimitPaginationResponseDTO<SimplifiedArtistDTO>) {
    super({
      ...result,
      items: result.items.map((item) => new SimplifiedArtistRO(item)),
    });
  }
}
