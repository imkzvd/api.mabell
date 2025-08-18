import { TmpFileId } from './types';
import { TmpFileDTO } from '../../dtos';

export interface TmpFileStorage {
  upload(file: Express.Multer.File): Promise<TmpFileDTO>;

  findById(id: string): Promise<TmpFileDTO | null>;

  deleteById(id: string): Promise<TmpFileId | null>;

  clear(): Promise<void>;
}
