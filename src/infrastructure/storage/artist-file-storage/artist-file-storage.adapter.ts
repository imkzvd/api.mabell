import * as path from 'path';
import { TmpFileDTO } from '../../../core/app/components/upload/dtos/tmp-file.dto';
import { StoredFileDTO } from '../../../core/app/common/dtos/file/stored-file.dto';
import { FileStorage } from '../base/file-storage.abstract';
import { ArtistFileStorage } from '../../../core/app/components/artist/ports/storage/artist-file-storage.port';
import { ArtistId } from '../../../core/domain/components/artist/artist.entity';

export class ArtistFileStorageAdapter extends FileStorage implements ArtistFileStorage {
  private readonly _avatarFileName: string = 'avatar.webp';
  private readonly _coverFileName: string = 'cover.webp';

  constructor() {
    super('artists');
  }

  async saveAvatar(id: ArtistId, file: TmpFileDTO): Promise<StoredFileDTO> {
    const isArtistDirExists = await this.existsDirectoryById(id);

    if (!isArtistDirExists) {
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

  deleteAvatar(id: ArtistId): Promise<void> {
    const artistDirPath = this.getDirectoryById(id);
    const artistAvatarPath = path.join(artistDirPath, this._avatarFileName);

    return this.deleteFileByIdFromDirectory(id, artistAvatarPath);
  }

  async saveCover(id: ArtistId, file: TmpFileDTO): Promise<StoredFileDTO> {
    const isArtistDirExists = await this.existsDirectoryById(id);

    if (!isArtistDirExists) {
      await this.createDirectory(id);
    }

    const absoluteFilePath = this.getAbsolutePath(id, this._coverFileName);
    const relativeFilePath = this.getRelativePath(absoluteFilePath);

    await this.convertImageToWebp(file.path, absoluteFilePath);

    return new StoredFileDTO(
      this._coverFileName,
      relativeFilePath,
      absoluteFilePath,
      file.size,
      file.type,
    );
  }

  deleteCover(id: ArtistId): Promise<void> {
    const artistDirPath = this.getDirectoryById(id);
    const artistCoverPath = path.join(artistDirPath, this._coverFileName);

    return this.deleteFileByIdFromDirectory(id, artistCoverPath);
  }

  async deleteDirectory(id: ArtistId): Promise<void> {
    return this.deleteDirectoryById(id);
  }
}
