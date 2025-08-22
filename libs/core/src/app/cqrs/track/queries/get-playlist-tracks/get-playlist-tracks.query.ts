import { Query } from '../../../../types';
import { OffsetLimitPaginationDTO } from '../../../../../shared/dtos';
import { PlaylistTracksDTO } from '../../../../dtos/playlist-tracks.dto';

export class GetPlaylistTracksQuery extends Query<PlaylistTracksDTO> {
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
