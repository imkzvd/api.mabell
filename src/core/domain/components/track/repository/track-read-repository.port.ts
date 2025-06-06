import { TrackWithAlbumAndArtistsDTO } from './dtos/track-with-album-and-artists.dto';
import { OffsetLimitPaginationDTO } from '../../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { OffsetLimitPaginationResponseDTO } from '../../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';

export const TRACK_READ_REPOSITORY_DI_TOKEN = Symbol('TRACK_READ_REPOSITORY_DI_TOKEN');

export interface TrackReadRepository {
  findById(
    id: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<TrackWithAlbumAndArtistsDTO | null>;

  findByIds(
    ids: string[],
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<{
    items: (TrackWithAlbumAndArtistsDTO | null)[];
    foundItems: TrackWithAlbumAndArtistsDTO[];
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
  ): Promise<OffsetLimitPaginationResponseDTO<TrackWithAlbumAndArtistsDTO>>;

  findByArtistId(
    artistId: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<TrackWithAlbumAndArtistsDTO>>;
}
