import { Query } from '../../../../types';
import { PlaylistsDTO } from '../../../../dtos';
import { OffsetLimitPaginationDTO } from '../../../../../shared/dtos';

export class GetPlaylistsByGenreQuery extends Query<PlaylistsDTO> {
  constructor(
    public readonly genres: string[],
    public readonly options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ) {
    super();
  }
}
