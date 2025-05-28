import { Inject } from '@nestjs/common';
import {
  TMP_FILE_STORAGE_DI_TOKEN,
  TmpFileStorage,
} from '../../common/ports/file-storages/tmp-file-storage.port';
import { TmpFileId } from '../../common/ports/file-storages/common/types';
import { NotFoundException } from '../../../shared/exceptions';
import { TmpFileDTO } from '../../common/ports/file-storages/common/dtos/tmp-file.dto';

export class UploadService {
  constructor(
    @Inject(TMP_FILE_STORAGE_DI_TOKEN) private readonly _tmpFileStorage: TmpFileStorage,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<TmpFileId> {
    const { id } = await this._tmpFileStorage.upload(file);

    return id;
  }

  async deleteFile(id: string): Promise<TmpFileId> {
    const deleteFileId = await this._tmpFileStorage.deleteById(id);

    if (!deleteFileId) {
      throw new NotFoundException('File does not exist');
    }

    return deleteFileId;
  }

  async deleteAllFiles(): Promise<void> {
    return this._tmpFileStorage.clear();
  }

  async getFile(id: string): Promise<TmpFileDTO | null> {
    return this._tmpFileStorage.findById(id);
  }
}
