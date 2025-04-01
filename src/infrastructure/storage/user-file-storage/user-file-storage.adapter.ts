import * as path from 'path';
import { UserFileStorage } from '../../../core/app/components/user/ports/storage/user-file-storage.port';
import { TmpFileDTO } from '../../../core/app/components/upload/dtos/tmp-file.dto';
import { UserId } from '../../../core/domain/components/user/user.entity';
import { StoredFileDTO } from '../../../core/app/common/dtos/file/stored-file.dto';
import { FileStorage } from '../base/file-storage.abstract';

export class UserFileStorageAdapter extends FileStorage implements UserFileStorage {
  private readonly _avatarFileName: string = 'avatar.webp';

  constructor() {
    super('users');
  }

  async saveAvatar(id: UserId, file: TmpFileDTO): Promise<StoredFileDTO> {
    const isUserDirExists = await this.existsDirectoryById(id);

    if (!isUserDirExists) {
      await this.createDirectory(id);
    }

    const absoluteFilePath = this.getAbsolutePath(id, this._avatarFileName);
    const relativeFilePath = this.getRelativePath(absoluteFilePath);

    await this.convertImageToWebp(file.path, absoluteFilePath);

    return new StoredFileDTO(
      this._avatarFileName,
      relativeFilePath,
      absoluteFilePath,
      file.size,
      file.type,
    );
  }

  deleteAvatar(id: UserId): Promise<void> {
    const userDirPath = this.getDirectoryById(id);
    const userAvatarPath = path.join(userDirPath, this._avatarFileName);

    return this.deleteFileByIdFromDirectory(id, userAvatarPath);
  }

  async deleteDirectory(id: UserId): Promise<void> {
    return this.deleteDirectoryById(id);
  }
}
