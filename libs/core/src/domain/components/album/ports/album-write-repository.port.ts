import { Album } from '../album.entity';
import { AlbumId } from '../types';

export interface AlbumWriteRepository {
  save(entity: Album): Promise<void>;

  deleteById(id: string): Promise<AlbumId | null>;

  deleteByArtistId(artistId: string): Promise<{
    deletedIds: AlbumId[];
    total: number;
  }>;

  findById(id: string): Promise<Album | null>;

  getNextArtistAlbumIndex(artistId: string): Promise<number>;

  existsById(id: string): Promise<AlbumId | null>;
}
