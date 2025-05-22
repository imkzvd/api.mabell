import { Query } from '@nestjs/cqrs';
import { AlbumDTO } from '../dtos/album.dto';
import { OffsetLimitPaginationResponseDTO } from '../../../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { OffsetLimitPaginationDTO } from '../../../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';

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
