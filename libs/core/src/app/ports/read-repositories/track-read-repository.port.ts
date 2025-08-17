import { TrackWithAlbumDTO } from './dtos/track-with-album.dto';
import {
  OffsetLimitPaginationDTO,
  OffsetLimitPaginationResponseDTO,
} from '../../../../shared/dtos';

export interface TrackReadRepository {
  findById(
    id: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<TrackWithAlbumDTO | null>;

  findByIds(
    ids: string[],
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<{
    items: (TrackWithAlbumDTO | null)[];
    foundItems: TrackWithAlbumDTO[];
    foundIds: string[];
    total: number;
    missingIds: string[];
  }>;

  findByAlbumId(
    albumId: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<TrackWithAlbumDTO>>;

  findByArtistId(
    artistId: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<TrackWithAlbumDTO>>;
}
