import { Query } from '../../../../types';
import { OffsetLimitPaginationDTO } from '../../../../../shared/dtos';
import { TracksDTO } from '../../../../dtos/tracks.dto';

export class GetAlbumTracksQuery extends Query<TracksDTO> {
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
