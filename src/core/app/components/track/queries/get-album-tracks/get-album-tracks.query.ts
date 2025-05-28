import { Query } from '@nestjs/cqrs';
import { TrackDTO } from '../../dtos/track.dto';
import { OffsetLimitPaginationResponseDTO } from '../../../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { OffsetLimitPaginationDTO } from '../../../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';

export class GetAlbumTracksQuery extends Query<OffsetLimitPaginationResponseDTO<TrackDTO>> {
  constructor(
    public readonly albumId: string,
    public readonly options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ) {
    super();
  }
}
