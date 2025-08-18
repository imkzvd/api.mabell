import { NotFoundException } from '../../../../shared/exceptions';
import { TmpFileStorage } from '../../../ports';
import { TmpFileId } from '../../../ports/file-storages/types';

export class UploadDeleteService {
  constructor(private readonly _FS: TmpFileStorage) {}

  async deleteById(fileId: string): Promise<TmpFileId> {
    const deleteFileId = await this._FS.deleteById(fileId);

    if (!deleteFileId) {
      throw new NotFoundException('File does not exist');
    }

    return deleteFileId;
  }

  deleteAll(): Promise<void> {
    return this._FS.clear();
  }
}
