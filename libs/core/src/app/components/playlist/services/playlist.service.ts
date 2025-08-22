import { OffsetLimitPaginationDTO } from '../../../../shared/dtos';
import { NotFoundException } from '../../../../shared/exceptions';
import { PlaylistDTO } from '../../../dtos';
import { TrackId } from '../../../../domain/components/track/types';
import { PlaylistReadRepository } from '../../../ports';
import { PlaylistsDTO } from '../../../dtos/playlists.dto';

export class PlaylistService {
  constructor(private readonly _RR: PlaylistReadRepository) {}

  findById(
    playlistId: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<PlaylistDTO | null> {
    return this._RR.findById(playlistId, options);
  }

  async findByUserId(
    userId: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<PlaylistsDTO> {
    return this._RR.findByUserId(userId, options);
  }

  async getTrackIdsById(
    playlistId: string,
    options?: Partial<{
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<{ id: TrackId; addedAt: Date }[]> {
    const foundPlaylist = await this._RR.findById(playlistId);

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    return foundPlaylist.tracks.splice(
      options?.pagination?.offset || 0,
      (options?.pagination?.offset || 0) + (options?.pagination?.limit || 25),
    );
  }
}
