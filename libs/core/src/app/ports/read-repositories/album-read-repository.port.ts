import { AlbumWithArtistsDTO } from './dtos/album-with-artists.dto';
import {
  OffsetLimitPaginationDTO,
  OffsetLimitPaginationResponseDTO,
} from '../../../../shared/dtos';

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
