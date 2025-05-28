import { Inject } from '@nestjs/common';
import { StoredFileDTO } from '../../../core/app/common/dtos/file/stored-file.dto';
import { FileStorage } from '../base/file-storage.abstract';
import {
  TMP_FILE_STORAGE_DI_TOKEN,
  TmpFileStorage,
} from '../../../core/app/components/upload/storage/tmp-file-storage.port';
import { BadRequestException } from '../../../core/shared/exceptions';
import { PlaylistId } from '../../../core/domain/components/playlist/types';
import { UserId } from '../../../core/domain/components/user/types';
import { UserFileStorage } from '../../../core/app/common/ports/file-storages/user-file-storage.port';

export class UserFileStorageAdapter extends FileStorage implements UserFileStorage {
  constructor(
    @Inject(TMP_FILE_STORAGE_DI_TOKEN)
    private readonly _tmpFileStorage: TmpFileStorage,
  ) {
    super('users');
  }

  async saveUserAvatar(id: UserId, fileId: string): Promise<StoredFileDTO> {
    const tmpFileData = await this._tmpFileStorage.findById(fileId);

    if (!tmpFileData) {
      throw new BadRequestException('The file has not been uploaded');
    }

    const { fileName, absPath, relPath } = this.getUserAvatarMetaById(id);
    await this.createUserDirectoryById(id);
    await this.convertAndSaveImage(tmpFileData.path, absPath);
    await this._tmpFileStorage.deleteById(tmpFileData.id);

    return new StoredFileDTO(fileName, relPath, absPath, tmpFileData.size, tmpFileData.type);
  }

  deleteUserAvatar(id: UserId): Promise<void> {
    const { absPath } = this.getUserAvatarMetaById(id);

    return this.deleteByPath(absPath);
  }

  async deleteUserDirectory(id: UserId): Promise<void> {
    const { absPath } = this.resolveProjectPath(id);

    return this.deleteByPath(absPath);
  }

  async savePlaylistCover(
    id: UserId,
    playlistId: PlaylistId,
    fileId: string,
  ): Promise<StoredFileDTO> {
    const tmpFileData = await this._tmpFileStorage.findById(fileId);

    if (!tmpFileData) {
      throw new BadRequestException('The file has not been uploaded');
    }

    await this.createPlaylistDirectoryById(id, playlistId);
    const { fileName, absPath, relPath } = this.getPlaylistCoverMetaById(id, playlistId);
    await this.convertAndSaveImage(tmpFileData.path, absPath);
    await this._tmpFileStorage.deleteById(tmpFileData.id);

    return new StoredFileDTO(fileName, relPath, absPath, tmpFileData.size, tmpFileData.type);
  }

  async deletePlaylistCover(id: UserId, playlistId: PlaylistId): Promise<void> {
    const { absPath } = this.getPlaylistCoverMetaById(id, playlistId);

    return this.deleteByPath(absPath);
  }

  deletePlaylistDirectory(id: UserId, playlistId: PlaylistId): Promise<void> {
    const { absPath } = this.resolveProjectPath(id, 'playlists', playlistId);

    return this.deleteByPath(absPath);
  }

  private createUserDirectoryById(id: UserId): Promise<{ absPath: string; relPath: string }> {
    return this.createDirectory(id);
  }

  private createPlaylistDirectoryById(
    userId: UserId,
    playlistId: PlaylistId,
  ): Promise<{ absPath: string; relPath: string }> {
    return this.createDirectory(userId, 'playlists', playlistId);
  }

  private getUserAvatarMetaById(id: UserId): {
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

  private getPlaylistCoverMetaById(
    userId: UserId,
    playlistId: PlaylistId,
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
