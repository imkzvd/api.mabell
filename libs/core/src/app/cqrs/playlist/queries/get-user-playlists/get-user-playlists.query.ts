import { Query } from '../../../../types';
import { OffsetLimitPaginationDTO } from '../../../../../shared/dtos';
import { PlaylistsDTO } from '../../../../dtos/playlists.dto';

export class GetUserPlaylistsQuery extends Query<PlaylistsDTO> {
  constructor(
    public readonly userId: string,
    public readonly options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ) {
    super();
  }
}
