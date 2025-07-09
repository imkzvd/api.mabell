import { TmpFileStorage } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { TmpFileDTO } from '@core/app/common/ports/file-storages/common/dtos/tmp-file.dto';

export class UploadFindService {
  constructor(private readonly _FS: TmpFileStorage) {}

  findById(id: string): Promise<TmpFileDTO | null> {
    return this._FS.findById(id);
  }
}
