import { Query } from '../../../../types';
import { OffsetLimitPaginationDTO } from '../../../../../shared/dtos';
import { AlbumsDTO } from '../../../../dtos';

export class GetAlbumsByGenresQuery extends Query<AlbumsDTO> {
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
