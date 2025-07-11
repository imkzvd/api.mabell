import { NotFoundException } from '@core/shared/exceptions';
import { TmpFileStorage } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { TmpFileId } from '@core/app/common/ports/file-storages/common/types';

export class UploadDeleteService {
  constructor(private readonly _FS: TmpFileStorage) {}

  async delete(id: string): Promise<TmpFileId> {
    const deleteFileId = await this._FS.deleteById(id);

    if (!deleteFileId) {
      throw new NotFoundException('File does not exist');
    }

    return deleteFileId;
  }

  deleteAll(): Promise<void> {
    return this._FS.clear();
  }
}
