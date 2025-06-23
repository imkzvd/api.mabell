import { Query } from '@nestjs/cqrs';
import { OffsetLimitPaginationResponseDTO } from '../../../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { OffsetLimitPaginationDTO } from '../../../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { TrackDTO } from '../../../../components/track/dtos/track.dto';

export class GetArtistTracksQuery extends Query<OffsetLimitPaginationResponseDTO<TrackDTO>> {
  constructor(
    public readonly artistId: string,
    public readonly options?: Partial<{
      pagination: OffsetLimitPaginationDTO;
      isPublic: boolean;
    }>,
  ) {
    super();
  }
}
