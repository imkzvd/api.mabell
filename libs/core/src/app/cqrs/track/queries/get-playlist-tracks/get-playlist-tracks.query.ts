import { Query } from '@core/app/types';
import { OffsetLimitPaginationResponseDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { OffsetLimitPaginationDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { PlaylistTrackDTO } from '@core/app/components/track/dtos/playlist-track.dto';

export class GetPlaylistTracksQuery extends Query<
  OffsetLimitPaginationResponseDTO<PlaylistTrackDTO>
> {
  constructor(
    public readonly playlistId: string,
    public readonly options?: Partial<{
      pagination: OffsetLimitPaginationDTO;
      isPublic: boolean;
    }>,
  ) {
    super();
  }
}
