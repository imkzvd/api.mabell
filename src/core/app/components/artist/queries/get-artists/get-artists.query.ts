import { Query } from '@nestjs/cqrs';
import { OffsetLimitPaginationResponseDTO } from '../../../../common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { OffsetLimitPaginationDTO } from '../../../../common/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { SimplifiedArtistDTO } from '../../dtos/simplified-artist.dto';

export class GetArtistsQuery extends Query<OffsetLimitPaginationResponseDTO<SimplifiedArtistDTO>> {
  constructor(public readonly pagination?: OffsetLimitPaginationDTO) {
    super();
  }
}
