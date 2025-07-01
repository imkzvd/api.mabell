import { Inject, Injectable } from '@nestjs/common';
import { FileStorage } from '@infrastructure/file-storage/base/file-storage.abstract';
import { UserFileStorage as UserFileStoragePort } from '@core/app/common/ports/file-storages/user-file-storage.port';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { UserId } from '@core/domain/components/user/types';
import { TmpFileDTO } from '@core/app/common/ports/file-storages/common/dtos/tmp-file.dto';
import { StoredFileDTO } from '@core/app/common/ports/file-storages/common/dtos/stored-file.dto';
import { PlaylistId } from '@core/domain/components/playlist/types';
import { TmpFileStorage } from '@infrastructure/file-storage/services/tmp-file-storage.service';

@Injectable()
export class UserFileStorage extends FileStorage implements UserFileStoragePort {
  constructor(@Inject(TmpFileStorage) private readonly _tmpFileStorage: TmpFileStoragePort) {
    super('users');
  }

  async saveUserAvatar(id: UserId, file: TmpFileDTO): Promise<StoredFileDTO> {
    const { fileName, absPath, relPath } = this.getUserAvatarMetaById(id);

    await this.createUserDirectoryById(id);
    await this.convertAndSaveImage(file.path, absPath);
    await this._tmpFileStorage.deleteById(file.id);

    return new StoredFileDTO(fileName, relPath, absPath, file.size, file.type);
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
    file: TmpFileDTO,
  ): Promise<StoredFileDTO> {
    await this.createPlaylistDirectoryById(id, playlistId);

    const { fileName, absPath, relPath } = this.getPlaylistCoverMetaById(id, playlistId);
    await this.convertAndSaveImage(file.path, absPath);
    await this._tmpFileStorage.deleteById(file.id);

    return new StoredFileDTO(fileName, relPath, absPath, file.size, file.type);
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
