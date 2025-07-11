import { TmpFileStorage } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { TmpFileId } from '@core/app/common/ports/file-storages/common/types';
import { UploadFilePayload } from '@core/app/components/upload/types';

export class UploadService {
  constructor(private readonly _FS: TmpFileStorage) {}

  async upload(payload: UploadFilePayload): Promise<TmpFileId> {
    const { id } = await this._FS.upload(payload.file);

    return id;
  }
}
