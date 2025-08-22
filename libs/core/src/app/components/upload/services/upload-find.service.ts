import { TmpFileDTO } from '../../../dtos';
import { TmpFileStorage } from '../../../ports';

export class UploadFindService {
  constructor(private readonly _FS: TmpFileStorage) {}

  findById(fileId: string): Promise<TmpFileDTO | null> {
    return this._FS.findById(fileId);
  }
}
