import { Inject } from '@nestjs/common';
import { FileStorage } from '../base/file-storage.abstract';
import { ArtistId } from '../../../core/domain/components/artist/types';
import { AlbumId } from '../../../core/domain/components/album/types';
import { TrackId } from '../../../core/domain/components/track/types';
import { ArtistFileStorage } from '../../../core/app/common/ports/file-storages/artist-file-storage.port';
import {
  TMP_FILE_STORAGE_DI_TOKEN,
  TmpFileStorage,
} from '../../../core/app/common/ports/file-storages/tmp-file-storage.port';
import { StoredFileDTO } from '../../../core/app/common/ports/file-storages/common/dtos/stored-file.dto';
import { TmpFileDTO } from '../../../core/app/common/ports/file-storages/common/dtos/tmp-file.dto';

export class ArtistFileStorageAdapter extends FileStorage implements ArtistFileStorage {
  constructor(@Inject(TMP_FILE_STORAGE_DI_TOKEN) private readonly _tmpFileStorage: TmpFileStorage) {
    super('artists');
  }

  async saveArtistAvatar(artistId: ArtistId, file: TmpFileDTO): Promise<StoredFileDTO> {
    await this.createArtistDirectoryById(artistId);

    const { fileName, absPath, relPath } = this.getArtistAvatarMetaById(artistId);
    await this.convertAndSaveImage(file.path, absPath);
    await this._tmpFileStorage.deleteById(file.id);

    return new StoredFileDTO(fileName, relPath, absPath, file.size, file.type);
  }

  deleteArtistAvatar(id: ArtistId): Promise<void> {
    const { absPath } = this.getArtistAvatarMetaById(id);

    return this.deleteByPath(absPath);
  }

  async saveArtistCover(id: ArtistId, file: TmpFileDTO): Promise<StoredFileDTO> {
    await this.createArtistDirectoryById(id);

    const { fileName, absPath, relPath } = this.getArtistCoverMetaById(id);
    await this.convertAndSaveImage(file.path, absPath);
    await this._tmpFileStorage.deleteById(file.id);

    return new StoredFileDTO(fileName, relPath, absPath, file.size, file.type);
  }

  deleteArtistCover(id: ArtistId): Promise<void> {
    const { absPath } = this.getArtistCoverMetaById(id);

    return this.deleteByPath(absPath);
  }

  deleteArtistDirectory(id: ArtistId): Promise<void> {
    const { absPath } = this.resolveProjectPath(id);

    return this.deleteByPath(absPath);
  }

  private createArtistDirectoryById(id: ArtistId): Promise<{ absPath: string; relPath: string }> {
    return this.createDirectory(id);
  }

  private getArtistAvatarMetaById(id: ArtistId): {
    fileName: string;
    absPath: string;
    relPath: string;
  } {
    const fileName = 'avatar.webp';

    return {
      fileName,
      ...this.resolveProjectPath(id, fileName),
    };
  }

  private getArtistCoverMetaById(id: ArtistId): {
    fileName: string;
    absPath: string;
    relPath: string;
  } {
    const fileName = 'cover.webp';

    return {
      fileName,
      ...this.resolveProjectPath(id, fileName),
    };
  }

  async saveAlbumCover(id: ArtistId, albumId: AlbumId, file: TmpFileDTO): Promise<StoredFileDTO> {
    await this.createAlbumDirectoryById(id, albumId);

    const { fileName, absPath, relPath } = this.getAlbumCoverMetaById(id, albumId);
    await this.convertAndSaveImage(file.path, absPath);
    await this._tmpFileStorage.deleteById(file.id);

    return new StoredFileDTO(fileName, relPath, absPath, file.size, file.type);
  }

  deleteAlbumCover(artistId: ArtistId, albumId: AlbumId): Promise<void> {
    const { absPath } = this.getAlbumCoverMetaById(artistId, albumId);

    return this.deleteByPath(absPath);
  }

  deleteAlbumDirectory(artistId: ArtistId, albumId: AlbumId): Promise<void> {
    const { absPath } = this.resolveProjectPath(artistId, 'albums', albumId);

    return this.deleteByPath(absPath);
  }

  async saveTrack(
    id: ArtistId,
    albumId: AlbumId,
    trackId: TrackId,
    file: TmpFileDTO,
  ): Promise<StoredFileDTO> {
    await this.createAlbumDirectoryById(id, albumId);

    const { fileName, absPath, relPath } = this.getTrackMeta(id, albumId, trackId);
    await this.moveFile(file.path, absPath);

    return new StoredFileDTO(fileName, relPath, absPath, file.size, file.type);
  }

  deleteTrack(artistId: ArtistId, albumId: AlbumId, trackId: TrackId): Promise<void> {
    const { absPath } = this.getTrackMeta(artistId, albumId, trackId);

    return this.deleteByPath(absPath);
  }

  private createAlbumDirectoryById(
    artistId: ArtistId,
    albumId: string,
  ): Promise<{ absPath: string; relPath: string }> {
    return this.createDirectory(artistId, 'albums', albumId);
  }

  private getAlbumCoverMetaById(
    artistId: ArtistId,
    albumId: AlbumId,
  ): {
    fileName: string;
    absPath: string;
    relPath: string;
  } {
    const fileName = 'cover.webp';

    return {
      fileName,
      ...this.resolveProjectPath(artistId, 'albums', albumId, fileName),
    };
  }

  private getTrackMeta(
    artistId: ArtistId,
    albumId: AlbumId,
    trackId: TrackId,
  ): {
    fileName: string;
    absPath: string;
    relPath: string;
  } {
    const fileName = `${trackId}.mp3`;

    return {
      fileName,
      ...this.resolveProjectPath(artistId, 'albums', albumId, fileName),
    };
  }
}
