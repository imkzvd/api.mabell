import { TmpFileId } from './types';
import { TmpFileDTO } from '../../dtos';

export interface TmpFileStorage {
  upload(file: Express.Multer.File): Promise<TmpFileDTO>;

  findById(fileId: string): Promise<TmpFileDTO | null>;

  deleteById(fileId: string): Promise<TmpFileId | null>;

  clear(): Promise<void>;
}
