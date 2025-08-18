import { TmpFileDTO, StoredFileDTO } from '../../dtos';

export interface ArtistFileStorage {
  saveArtistAvatar(artistId: string, file: TmpFileDTO): Promise<StoredFileDTO>;

  deleteArtistAvatar(id: string): Promise<void>;

  saveArtistCover(artistId: string, file: TmpFileDTO): Promise<StoredFileDTO>;

  deleteArtistCover(id: string): Promise<void>;

  deleteArtistDirectory(id: string): Promise<void>;

  saveAlbumCover(artistId: string, albumId: string, file: TmpFileDTO): Promise<StoredFileDTO>;

  deleteAlbumCover(artistId: string, albumId: string): Promise<void>;

  deleteAlbumDirectory(artistId: string, albumId: string): Promise<void>;

  saveTrack(
    artistId: string,
    albumId: string,
    trackId: string,
    file: TmpFileDTO,
  ): Promise<StoredFileDTO>;

  deleteTrack(artistId: string, albumId: string, trackId: string): Promise<void>;
}
