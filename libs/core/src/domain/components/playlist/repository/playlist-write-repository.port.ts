import { Playlist } from '../playlist.entity';
import { PlaylistId } from '../types';

export interface PlaylistWriteRepository {
  save(entity: Playlist): Promise<void>;

  deleteById(id: string): Promise<PlaylistId | null>;

  deleteByOwnerId(ownerId: string): Promise<{
    deletedIds: PlaylistId[];
    total: number;
  }>;

  findById(id: string): Promise<Playlist | null>;

  getNextPlaylistIndexByOwnerId(ownerId: string): Promise<number>;
}
