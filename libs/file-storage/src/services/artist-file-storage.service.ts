import { Inject, Injectable } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { FileStorage } from '../base/file-storage.abstract';
import { TmpFileStorage } from './tmp-file-storage.service';

@Injectable()
export class ArtistFileStorage extends FileStorage implements App.Ports.ArtistFileStorage {
  constructor(@Inject(TmpFileStorage) private readonly _tmpFS: TmpFileStorage) {
    super('artists');
  }

  async saveArtistAvatar(artistId: string, file: App.DTOs.TmpFileDTO) {
    await this.createArtistDirectoryById(artistId);

    const { fileName, absPath, relPath } = this.getArtistAvatarMetaById(artistId);
    await this.convertAndSaveImage(file.path, absPath);
    await this._tmpFS.deleteById(file.id);

    return new App.DTOs.StoredFileDTO(fileName, relPath, absPath, file.size, file.type);
  }

  deleteArtistAvatar(artistId: string) {
    const { absPath } = this.getArtistAvatarMetaById(artistId);

    return this.deleteByPath(absPath);
  }

  async saveArtistCover(artistId: string, file: App.DTOs.TmpFileDTO) {
    await this.createArtistDirectoryById(artistId);

    const { fileName, absPath, relPath } = this.getArtistCoverMetaById(artistId);
    await this.convertAndSaveImage(file.path, absPath);
    await this._tmpFS.deleteById(file.id);

    return new App.DTOs.StoredFileDTO(fileName, relPath, absPath, file.size, file.type);
  }

  deleteArtistCover(artistId: string) {
    const { absPath } = this.getArtistCoverMetaById(artistId);

    return this.deleteByPath(absPath);
  }

  deleteArtistDirectory(artistId: string) {
    const { absPath } = this.resolveProjectPath(artistId);

    return this.deleteByPath(absPath);
  }

  private createArtistDirectoryById(artistId: string) {
    return this.createDirectory(artistId);
  }

  private getArtistAvatarMetaById(artistId: string) {
    const fileName = 'avatar.webp';

    return {
      fileName,
      ...this.resolveProjectPath(artistId, fileName),
    };
  }

  private getArtistCoverMetaById(artistId: string) {
    const fileName = 'cover.webp';

    return {
      fileName,
      ...this.resolveProjectPath(artistId, fileName),
    };
  }

  async saveAlbumCover(artistId: string, albumId: string, file: App.DTOs.TmpFileDTO) {
    await this.createAlbumDirectory(artistId, albumId);

    const { fileName, absPath, relPath } = this.getAlbumCoverMeta(artistId, albumId);
    await this.convertAndSaveImage(file.path, absPath);
    await this._tmpFS.deleteById(file.id);

    return new App.DTOs.StoredFileDTO(fileName, relPath, absPath, file.size, file.type);
  }

  deleteAlbumCover(artistId: string, albumId: string) {
    const { absPath } = this.getAlbumCoverMeta(artistId, albumId);

    return this.deleteByPath(absPath);
  }

  deleteAlbumDirectory(artistId: string, albumId: string) {
    const { absPath } = this.resolveProjectPath(artistId, 'albums', albumId);

    return this.deleteByPath(absPath);
  }

  async saveTrack(id: string, albumId: string, trackId: string, file: App.DTOs.TmpFileDTO) {
    await this.createAlbumDirectory(id, albumId);

    const { fileName, absPath, relPath } = this.getTrackMeta(id, albumId, trackId);
    await this.moveFile(file.path, absPath);

    return new App.DTOs.StoredFileDTO(fileName, relPath, absPath, file.size, file.type);
  }

  deleteTrack(artistId: string, albumId: string, trackId: string) {
    const { absPath } = this.getTrackMeta(artistId, albumId, trackId);

    return this.deleteByPath(absPath);
  }

  private createAlbumDirectory(
    artistId: string,
    albumId: string,
  ): Promise<{ absPath: string; relPath: string }> {
    return this.createDirectory(artistId, 'albums', albumId);
  }

  private getAlbumCoverMeta(
    artistId: string,
    albumId: string,
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
    artistId: string,
    albumId: string,
    trackId: string,
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
