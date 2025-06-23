import { NotFoundException } from '@core/shared/exceptions';
import { TmpFileStorage } from '../../common/ports/file-storages/tmp-file-storage.port';
import { TmpFileId } from '../../common/ports/file-storages/common/types';
import { TmpFileDTO } from '../../common/ports/file-storages/common/dtos/tmp-file.dto';
import { UploadFilePayload } from './types';

export class UploadService {
  constructor(private readonly _tmpFileStorage: TmpFileStorage) {}

  async uploadFile(payload: UploadFilePayload): Promise<TmpFileId> {
    const { id } = await this._tmpFileStorage.upload(payload.file);

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
