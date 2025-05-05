import { PlaylistWithOwnerDTO } from './dtos/playlist-with-owner.dto';
import { OffsetLimitPaginationDTO } from '../../../../common/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { OffsetLimitPaginationResponseDTO } from '../../../../common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';

export const PLAYLIST_READ_REPOSITORY_DI_TOKEN = Symbol('PLAYLIST_READ_REPOSITORY_DI_TOKEN');

export interface PlaylistReadRepository {
  findById(
    id: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<PlaylistWithOwnerDTO | null>;

  getTracks(
    id: string,
    options?: Partial<{
      pagination?: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<{ id: string; addedAt: Date }>>;

  getPublicStatus(id: string): Promise<boolean>;
}
