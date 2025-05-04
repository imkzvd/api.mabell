import { Album } from '../album.entity';

export const ALBUM_WRITE_REPOSITORY_DI_TOKEN = Symbol('ALBUM_WRITE_REPOSITORY_DI_TOKEN');

export interface AlbumWriteRepository {
  save(entity: Album): Promise<void>;
  deleteById(id: string): Promise<boolean>;
  deleteByArtistId(artistId: string): Promise<void>;
  findById(id: string): Promise<Album | null>;
  getNextArtistAlbumIndex(artistId: string): Promise<number>;
}
