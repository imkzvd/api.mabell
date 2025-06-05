import { Query } from '@nestjs/cqrs';
import { OffsetLimitPaginationResponseDTO } from '../../../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { OffsetLimitPaginationDTO } from '../../../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { AlbumDTO } from '../../../../components/album/dtos/album.dto';

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
