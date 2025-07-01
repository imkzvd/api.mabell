import { Query } from '@core/app/types';
import { OffsetLimitPaginationResponseDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { OffsetLimitPaginationDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { TrackDTO } from '@core/app/components/track/dtos/track.dto';

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
