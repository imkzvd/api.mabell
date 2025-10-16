import { Query } from '../../../../types';
import { OffsetLimitPaginationDTO } from '../../../../../shared/dtos';
import { ArtistsDTO } from '../../../../dtos';

export class GetArtistsByGenresQuery extends Query<ArtistsDTO> {
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
