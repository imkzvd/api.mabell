import { TmpFileDTO } from '../dtos/tmp-file.dto';

export const TMP_FILE_STORAGE_DI_TOKEN = Symbol('TMP_FILE_STORAGE_DI_TOKEN');

export interface TmpFileStorage {
  upload(file: Express.Multer.File): Promise<TmpFileDTO>;
  findById(id: string): Promise<TmpFileDTO | null>;
  deleteById(id: string): Promise<string | null>;
  clear(): Promise<void>;
}
