import { TmpFileDTO } from './common/dtos/tmp-file.dto';
import { TmpFileId } from './common/types';

export interface TmpFileStorage {
  upload(file: Express.Multer.File): Promise<TmpFileDTO>;

  findById(id: string): Promise<TmpFileDTO | null>;

  deleteById(id: string): Promise<TmpFileId | null>;

  clear(): Promise<void>;
}
