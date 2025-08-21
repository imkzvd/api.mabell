import { Query } from '../../../../types';
import { OffsetLimitPaginationDTO } from '../../../../../shared/dtos';
import { AlbumsDTO } from '../../../../dtos/albums.dto';

export class GetArtistAlbumsQuery extends Query<AlbumsDTO> {
  constructor(
    public readonly artistId: string,
    public readonly options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ) {
    super();
  }
}
