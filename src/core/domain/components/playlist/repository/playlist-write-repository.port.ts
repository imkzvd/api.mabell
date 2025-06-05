import { Playlist } from '../playlist.entity';
import { PlaylistId } from '../types';
export const PLAYLIST_WRITE_REPOSITORY_DI_TOKEN = Symbol('PLAYLIST_WRITE_REPOSITORY_DI_TOKEN');

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
