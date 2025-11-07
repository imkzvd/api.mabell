import { OffsetLimitPaginationDTO } from '../../../../shared/dtos';
import { NotFoundException } from '../../../../shared/exceptions';
import { PlaylistDTO } from '../../../dtos';
import { TrackId } from '../../../../domain/components/track';
import { PlaylistReadRepository } from '../../../ports';
import { PlaylistsDTO } from '../../../dtos';

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

  findByIds(
    playlistIds: string[],
    options?: Partial<{ isPublic: boolean }>,
  ): Promise<{
    items: (PlaylistDTO | null)[];
    foundItems: PlaylistDTO[];
    foundIds: string[];
    total: number;
    missingIds: string[];
  }> {
    return this._RR.findByIds(playlistIds, options);
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

  async getByGenres(
    genres: string[],
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<PlaylistsDTO> {
    return this._RR.findByGenres(genres, options);
  }
}
