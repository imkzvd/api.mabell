import { PlaylistDTO } from '../../dtos';
import { OffsetLimitPaginationDTO, OffsetLimitPaginationResponseDTO } from '../../../shared/dtos';
import { PlaylistsDTO } from '../../dtos/playlists.dto';
import { TrackId } from '../../../domain/components/track/types';

export interface PlaylistReadRepository {
  findById(
    id: string,
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

  getTracks(
    id: string,
    options?: Partial<{
      pagination?: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<{ id: TrackId; addedAt: Date }>>;

  getPublicStatus(id: string): Promise<boolean>;
}
