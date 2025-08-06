import { Playlist } from '../playlist.entity';
import { PlaylistId } from '../types';

export interface PlaylistWriteRepository {
  save(entity: Playlist): Promise<void>;

  deleteById(id: string): Promise<PlaylistId | null>;

  deleteByUserId(userId: string): Promise<{
    deletedIds: PlaylistId[];
    total: number;
  }>;

  findById(id: string): Promise<Playlist | null>;

  getNextPlaylistIndexByUserId(userId: string): Promise<number>;
}
