import { Inject, Injectable } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { FileStorage } from '../base/file-storage.abstract';
import { TmpFileStorage } from './tmp-file-storage.service';

@Injectable()
export class UserFileStorage extends FileStorage implements App.Ports.UserFileStorage {
  constructor(@Inject(TmpFileStorage) private readonly _tmpFileStorage: TmpFileStorage) {
    super('users');
  }

  async saveUserAvatar(userId: string, file: App.DTOs.TmpFileDTO) {
    const { fileName, absPath, relPath } = this.getUserAvatarMetaById(userId);

    await this.createUserDirectoryById(userId);
    await this.convertAndSaveImage(file.path, absPath);
    await this._tmpFileStorage.deleteById(file.id);

    return new App.DTOs.StoredFileDTO(fileName, relPath, absPath, file.size, file.type);
  }

  deleteUserAvatar(userId: string) {
    const { absPath } = this.getUserAvatarMetaById(userId);

    return this.deleteByPath(absPath);
  }

  async deleteUserDirectory(userId: string) {
    const { absPath } = this.resolveProjectPath(userId);

    return this.deleteByPath(absPath);
  }

  async savePlaylistCover(userId: string, playlistId: string, file: App.DTOs.TmpFileDTO) {
    await this.createPlaylistDirectoryById(userId, playlistId);

    const { fileName, absPath, relPath } = this.getPlaylistCoverMetaById(userId, playlistId);
    await this.convertAndSaveImage(file.path, absPath);
    await this._tmpFileStorage.deleteById(file.id);

    return new App.DTOs.StoredFileDTO(fileName, relPath, absPath, file.size, file.type);
  }

  async deletePlaylistCover(userId: string, playlistId: string) {
    const { absPath } = this.getPlaylistCoverMetaById(userId, playlistId);

    return this.deleteByPath(absPath);
  }

  deletePlaylistDirectory(userId: string, playlistId: string) {
    const { absPath } = this.resolveProjectPath(userId, 'playlists', playlistId);

    return this.deleteByPath(absPath);
  }

  private createUserDirectoryById(id: string): Promise<{ absPath: string; relPath: string }> {
    return this.createDirectory(id);
  }

  private createPlaylistDirectoryById(
    userId: string,
    playlistId: string,
  ): Promise<{ absPath: string; relPath: string }> {
    return this.createDirectory(userId, 'playlists', playlistId);
  }

  private getUserAvatarMetaById(userId: string): {
    fileName: string;
    absPath: string;
    relPath: string;
  } {
    const fileName = 'avatar.webp';

    return {
      fileName,
      ...this.resolveProjectPath(userId, fileName),
    };
  }

  private getPlaylistCoverMetaById(
    userId: string,
    playlistId: string,
  ): {
    fileName: string;
    absPath: string;
    relPath: string;
  } {
    const fileName = 'cover.webp';

    return {
      fileName,
      ...this.resolveProjectPath(userId, 'playlists', playlistId, fileName),
    };
  }
}
