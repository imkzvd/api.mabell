import { Playlist } from '../playlist.entity';
import { PlaylistId } from '../types';

export interface PlaylistWriteRepository {
  save(entity: Playlist): Promise<void>;

  deleteById(playlistId: string): Promise<PlaylistId | null>;

  deleteByUserId(userId: string): Promise<{
    deletedIds: PlaylistId[];
    total: number;
  }>;

  findById(playlistId: string): Promise<Playlist | null>;

  getNextPlaylistIndexByUserId(userId: string): Promise<number>;
}
