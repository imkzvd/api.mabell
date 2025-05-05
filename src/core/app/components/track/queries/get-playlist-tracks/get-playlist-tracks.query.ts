import { Query } from '@nestjs/cqrs';
import { OffsetLimitPaginationResponseDTO } from '../../../../common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { OffsetLimitPaginationDTO } from '../../../../common/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { PlaylistTrackDTO } from '../dtos/playlist-track.dto';

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
