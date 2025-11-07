import { PlaylistDTO } from '../../dtos';
import { OffsetLimitPaginationDTO } from '../../../shared/dtos';
import { PlaylistsDTO } from '../../dtos';
import { PlaylistTrackIdsDTO } from '../../dtos';
import { PlaylistId } from '../../../domain/components/playlist';

export interface PlaylistReadRepository {
  findById(
    playlistId: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<PlaylistDTO | null>;

  findByIds(
    playlistIds: string[],
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<{
    items: (PlaylistDTO | null)[];
    foundItems: PlaylistDTO[];
    foundIds: PlaylistId[];
    total: number;
    missingIds: string[];
  }>;

  findByUserId(
    userId: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<PlaylistsDTO>;

  findByGenres(
    genres: string[],
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<PlaylistsDTO>;

  getTrackIdsById(
    playlistId: string,
    options?: Partial<{
      pagination?: OffsetLimitPaginationDTO;
    }>,
  ): Promise<PlaylistTrackIdsDTO>;

  getPublicStatusById(playlistId: string): Promise<boolean>;
}
