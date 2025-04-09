import { Inject } from '@nestjs/common';
import { StoredFileDTO } from '../../../core/app/common/dtos/file/stored-file.dto';
import { FileStorage } from '../base/file-storage.abstract';
import { ArtistFileStorage } from '../../../core/app/components/artist/ports/storage/artist-file-storage.port';
import { ArtistId } from '../../../core/domain/components/artist/artist.entity';
import {
  TMP_FILE_STORAGE_DI_TOKEN,
  TmpFileStorage,
} from '../../../core/app/components/upload/storage/tmp-file-storage.port';
import { BadRequestException } from '../../../core/shared/exceptions';

export class ArtistFileStorageAdapter extends FileStorage implements ArtistFileStorage {
  constructor(
    @Inject(TMP_FILE_STORAGE_DI_TOKEN)
    private readonly _tmpFileStorage: TmpFileStorage,
  ) {
    super('artists');
  }

  async saveArtistAvatar(artistId: ArtistId, fileId: string): Promise<StoredFileDTO> {
    const tmpFileData = await this._tmpFileStorage.findById(fileId);

    if (!tmpFileData) {
      throw new BadRequestException('The file has not been uploaded');
    }

    await this.createArtistDirectoryById(artistId);
    const { fileName, absPath, relPath } = this.getArtistAvatarMetaById(artistId);
    await this.convertAndSaveImage(tmpFileData.path, absPath);
    await this._tmpFileStorage.deleteById(tmpFileData.id);

    return new StoredFileDTO(fileName, relPath, absPath, tmpFileData.size, tmpFileData.type);
  }

  deleteArtistAvatar(id: ArtistId): Promise<void> {
    const { absPath } = this.getArtistAvatarMetaById(id);

    return this.deleteByPath(absPath);
  }

  async saveArtistCover(id: ArtistId, fileId: string): Promise<StoredFileDTO> {
    const tmpFileData = await this._tmpFileStorage.findById(fileId);

    if (!tmpFileData) {
      throw new BadRequestException('The file has not been uploaded');
    }

    await this.createArtistDirectoryById(id);
    const { fileName, absPath, relPath } = this.getArtistCoverMetaById(id);
    await this.convertAndSaveImage(tmpFileData.path, absPath);
    await this._tmpFileStorage.deleteById(tmpFileData.id);

    return new StoredFileDTO(fileName, relPath, absPath, tmpFileData.size, tmpFileData.type);
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
}
