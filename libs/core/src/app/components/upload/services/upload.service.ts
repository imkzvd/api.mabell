import { UploadFilePayload } from '../types';
import { TmpFileStorage } from '../../../ports';
import { TmpFileId } from '../../../ports/file-storages/types';

export class UploadService {
  constructor(private readonly _FS: TmpFileStorage) {}

  async upload(payload: UploadFilePayload): Promise<TmpFileId> {
    const { id } = await this._FS.upload(payload.file);

    return id;
  }
}
