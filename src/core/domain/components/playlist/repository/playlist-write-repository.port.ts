import { Playlist } from '../playlist.entity';

export const PLAYLIST_WRITE_REPOSITORY_DI_TOKEN = Symbol('PLAYLIST_WRITE_REPOSITORY_DI_TOKEN');

export interface PlaylistWriteRepository {
  save(entity: Playlist): Promise<void>;
  deleteById(id: string): Promise<boolean>;
  findById(id: string): Promise<Playlist | null>;
  getNextPlaylistIndexByOwnerId(ownerId: string): Promise<number>;
}
