import { Inject } from '@nestjs/common';
import { UserFileStorage } from '../../../core/app/components/user/ports/storage/user-file-storage.port';
import { UserId } from '../../../core/domain/components/user/user.entity';
import { StoredFileDTO } from '../../../core/app/common/dtos/file/stored-file.dto';
import { FileStorage } from '../base/file-storage.abstract';
import {
  TMP_FILE_STORAGE_DI_TOKEN,
  TmpFileStorage,
} from '../../../core/app/components/upload/storage/tmp-file-storage.port';
import { BadRequestException } from '../../../core/shared/exceptions';

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

  private createUserDirectoryById(id: UserId): Promise<{ absPath: string; relPath: string }> {
    return this.createDirectory(id);
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
}
