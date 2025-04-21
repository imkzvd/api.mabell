import { Query } from '@nestjs/cqrs';
import { OffsetLimitPaginationResponseDTO } from '../../../../common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { OffsetLimitPaginationDTO } from '../../../../common/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { ArtistDTO } from '../dtos/artist.dto';

export class GetArtistsQuery extends Query<OffsetLimitPaginationResponseDTO<ArtistDTO>> {
  constructor(public readonly pagination?: OffsetLimitPaginationDTO) {
    super();
  }
}
