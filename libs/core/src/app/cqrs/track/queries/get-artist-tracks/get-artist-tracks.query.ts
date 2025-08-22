import { Query } from '../../../../types';
import { OffsetLimitPaginationDTO } from '../../../../../shared/dtos';
import { TracksDTO } from '../../../../dtos/tracks.dto';

export class GetArtistTracksQuery extends Query<TracksDTO> {
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
