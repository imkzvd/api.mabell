import { AlbumWithArtistsDTO } from './dtos/album-with-artists.dto';
import { OffsetLimitPaginationDTO } from '../../../../common/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { OffsetLimitPaginationResponseDTO } from '../../../../common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';

export const ALBUM_READ_REPOSITORY_DI_TOKEN = Symbol('ALBUM_READ_REPOSITORY_DI_TOKEN');

export interface AlbumReadRepository {
  findById(
    id: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<AlbumWithArtistsDTO | null>;

  findByArtistId(
    artistId: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<AlbumWithArtistsDTO>>;

  getPublicStatus(id: string): Promise<boolean>;
}
