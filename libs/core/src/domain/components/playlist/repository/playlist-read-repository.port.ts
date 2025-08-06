import { PlaylistWithUserDTO } from './dtos/playlist-with-user.dto';
import { OffsetLimitPaginationDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { OffsetLimitPaginationResponseDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';

export interface PlaylistReadRepository {
  findById(
    id: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<PlaylistWithUserDTO | null>;

  findByUserId(
    userId: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<PlaylistWithUserDTO>>;

  getTracks(
    id: string,
    options?: Partial<{
      pagination?: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<{ id: string; addedAt: Date }>>;

  getPublicStatus(id: string): Promise<boolean>;
}
