import { StoredFileDTO } from '../../../../common/dtos/file/stored-file.dto';
import { ArtistId } from '../../../../../domain/components/artist/artist.entity';
import { AlbumId } from '../../../../../domain/components/album/album.entity';

export const ARTIST_FILE_STORAGE_DI_TOKEN = Symbol('ARTIST_FILE_STORAGE_DI_TOKEN');

export interface ArtistFileStorage {
  saveArtistAvatar(artistId: ArtistId, fileId: string): Promise<StoredFileDTO>;
  deleteArtistAvatar(id: ArtistId): Promise<void>;
  saveArtistCover(artistId: ArtistId, fileId: string): Promise<StoredFileDTO>;
  deleteArtistCover(id: ArtistId): Promise<void>;
  deleteArtistDirectory(id: ArtistId): Promise<void>;
  saveAlbumCover(artistId: ArtistId, albumId: AlbumId, fileId: string): Promise<StoredFileDTO>;
  deleteAlbumCover(artistId: ArtistId, albumId: AlbumId): Promise<void>;
  deleteAlbumDirectory(artistId: ArtistId, albumId: AlbumId): Promise<void>;
}
