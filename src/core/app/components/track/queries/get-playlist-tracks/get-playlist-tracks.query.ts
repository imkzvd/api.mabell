import { Query } from '@nestjs/cqrs';
import { PlaylistTrackDTO } from '../dtos/playlist-track.dto';
import { OffsetLimitPaginationResponseDTO } from '../../../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { OffsetLimitPaginationDTO } from '../../../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';

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
