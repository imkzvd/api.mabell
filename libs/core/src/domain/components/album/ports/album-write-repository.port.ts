import { Album } from '../album.entity';
import { AlbumId } from '../types';

export interface AlbumWriteRepository {
  save(entity: Album): Promise<void>;

  deleteById(albumId: string): Promise<AlbumId | null>;

  deleteByArtistId(artistId: string): Promise<{
    deletedIds: AlbumId[];
    total: number;
  }>;

  findById(albumId: string): Promise<Album | null>;

  getNextAlbumIndexByArtistId(artistId: string): Promise<number>;

  existsById(albumId: string): Promise<AlbumId | null>;
}
