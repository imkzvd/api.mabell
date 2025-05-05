import { Query } from '@nestjs/cqrs';
import { OffsetLimitPaginationDTO } from '../../../../common/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { OffsetLimitPaginationResponseDTO } from '../../../../common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { AlbumDTO } from '../dtos/album.dto';

export class GetArtistAlbumsQuery extends Query<OffsetLimitPaginationResponseDTO<AlbumDTO>> {
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
