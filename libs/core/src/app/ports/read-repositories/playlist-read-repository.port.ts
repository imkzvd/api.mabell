import { PlaylistDTO } from '../../dtos';
import { OffsetLimitPaginationDTO } from '../../../shared/dtos';
import { PlaylistsDTO } from '../../dtos/playlists.dto';
import { PlaylistTrackIdsDTO } from '../../dtos/playlist-track-ids.dto';

export interface PlaylistReadRepository {
  findById(
    playlistId: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<PlaylistDTO | null>;

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
