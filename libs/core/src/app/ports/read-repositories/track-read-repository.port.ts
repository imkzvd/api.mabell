import { TrackWithAlbumDTO } from '../../dtos';
import { OffsetLimitPaginationDTO } from '../../../shared/dtos';
import { TracksDTO } from '../../dtos';
import { TrackId } from '../../../domain/components/track';

export interface TrackReadRepository {
  findById(
    trackId: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<TrackWithAlbumDTO | null>;

  findByIds(
    trackIds: string[],
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<{
    items: (TrackWithAlbumDTO | null)[];
    foundItems: TrackWithAlbumDTO[];
    foundIds: TrackId[];
    total: number;
    missingIds: string[];
  }>;

  findByAlbumId(
    albumId: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<TracksDTO>;

  findByArtistId(
    artistId: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<TracksDTO>;
}
