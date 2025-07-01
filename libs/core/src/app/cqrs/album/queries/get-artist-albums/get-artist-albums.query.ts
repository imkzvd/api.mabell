import { Query } from '@core/app/types';
import { OffsetLimitPaginationResponseDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { OffsetLimitPaginationDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { AlbumDTO } from '@core/app/components/album/dtos/album.dto';

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
