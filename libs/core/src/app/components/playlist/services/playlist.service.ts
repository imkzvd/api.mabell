import { NotFoundException } from '@core/shared/exceptions';
import { OffsetLimitPaginationDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { PlaylistReadRepository } from '@core/domain/components/playlist/repository/playlist-read-repository.port';
import { TrackId } from '@core/domain/components/track/types';
import { PlaylistDTO } from '../dtos/playlist.dto';
import PlaylistMapper from '../dtos/playlist.mapper';
import { OffsetLimitPaginationResponseDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';

export class PlaylistService {
  constructor(private readonly _RR: PlaylistReadRepository) {}

  async find(
    id: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<PlaylistDTO | null> {
    const foundPlaylist = await this._RR.findById(id, options);

    return foundPlaylist ? PlaylistMapper.toDTO(foundPlaylist) : null;
  }

  async findByUserId(
    userId: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<PlaylistDTO>> {
    const response = await this._RR.findByUserId(userId, options);

    return {
      ...response,
      items: response.items.map((i) => PlaylistMapper.toDTO(i)),
    };
  }

  async getTrackIds(
    id: string,
    options?: Partial<{
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<{ id: TrackId; addedAt: Date }[]> {
    const foundPlaylist = await this._RR.findById(id);

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    return foundPlaylist.tracks.splice(
      options?.pagination?.offset || 0,
      (options?.pagination?.offset || 0) + (options?.pagination?.limit || 25),
    );
  }
}
