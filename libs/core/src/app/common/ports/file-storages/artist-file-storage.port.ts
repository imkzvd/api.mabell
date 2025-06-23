import { ArtistId } from '../../../../domain/components/artist/types';
import { AlbumId } from '../../../../domain/components/album/types';
import { TrackId } from '../../../../domain/components/track/types';
import { StoredFileDTO } from './common/dtos/stored-file.dto';
import { TmpFileDTO } from './common/dtos/tmp-file.dto';

export const ARTIST_FILE_STORAGE_DI_TOKEN = Symbol('ARTIST_FILE_STORAGE_DI_TOKEN');

export interface ArtistFileStorage {
  saveArtistAvatar(artistId: ArtistId, file: TmpFileDTO): Promise<StoredFileDTO>;

  deleteArtistAvatar(id: ArtistId): Promise<void>;

  saveArtistCover(artistId: ArtistId, file: TmpFileDTO): Promise<StoredFileDTO>;

  deleteArtistCover(id: ArtistId): Promise<void>;

  deleteArtistDirectory(id: ArtistId): Promise<void>;

  saveAlbumCover(artistId: ArtistId, albumId: AlbumId, file: TmpFileDTO): Promise<StoredFileDTO>;

  deleteAlbumCover(artistId: ArtistId, albumId: AlbumId): Promise<void>;

  deleteAlbumDirectory(artistId: ArtistId, albumId: AlbumId): Promise<void>;

  saveTrack(
    artistId: ArtistId,
    albumId: AlbumId,
    trackId: TrackId,
    file: TmpFileDTO,
  ): Promise<StoredFileDTO>;

  deleteTrack(artistId: ArtistId, albumId: AlbumId, trackId: TrackId): Promise<void>;
}
