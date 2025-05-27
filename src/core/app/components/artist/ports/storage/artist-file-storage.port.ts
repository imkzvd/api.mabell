import { StoredFileDTO } from '../../../../common/dtos/file/stored-file.dto';
import { ArtistId } from '../../../../../domain/components/artist/types';
import { AlbumId } from '../../../../../domain/components/album/types';
import { TrackId } from '../../../../../domain/components/track/types';

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
  saveTrack(
    artistId: ArtistId,
    albumId: AlbumId,
    trackId: TrackId,
    fileId: string,
  ): Promise<StoredFileDTO>;
  deleteTrack(artistId: ArtistId, albumId: AlbumId, trackId: TrackId): Promise<void>;
}
