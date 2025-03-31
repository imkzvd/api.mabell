import * as path from 'path';
import * as fsPromises from 'fs/promises';
import * as process from 'process';
import { v4 as uuidv4 } from 'uuid';
import { TmpFileStorage } from '../../../core/app/components/upload/storage/tmp-file-storage.port';
import { TmpFileDTO } from '../../../core/app/components/upload/dtos/tmp-file.dto';
import { redisClient } from '../../cache/redis/client';

export class TmpFileStorageAdapter implements TmpFileStorage {
  private readonly _dir: string = path.join(process.cwd(), '/tmp');

  constructor() {
    fsPromises.mkdir(this._dir, { recursive: true });
  }

  async upload(file: Express.Multer.File): Promise<TmpFileDTO> {
    const generatedId = uuidv4();
    const fileExtension = path.extname(file.originalname);
    const originalFileName = file.originalname.replace(fileExtension, '');
    const uniqueFileName = `${generatedId}${fileExtension}`;
    const fullFilePath = path.join(this._dir, uniqueFileName);
    const relativeFilePath = path.relative(process.cwd(), fullFilePath);
    const uploadedAt = new Date();
    const expiresAt = new Date();

    expiresAt.setUTCDate(expiresAt.getUTCDate() + 1);
    expiresAt.setUTCHours(0, 0, 0, 0);

    await fsPromises.writeFile(fullFilePath, file.buffer);

    const fileData = new TmpFileDTO(
      generatedId,
      uniqueFileName,
      originalFileName,
      fullFilePath,
      relativeFilePath,
      file.size,
      file.mimetype,
      uploadedAt,
      expiresAt,
    );

    const prepKey: string = `file:${generatedId}`;

    await redisClient.set(
      prepKey,
      JSON.stringify(fileData),
      'EX',
      (expiresAt.getTime() - Date.now()) / 1000,
    );

    return fileData;
  }

  async findById(id: string): Promise<TmpFileDTO | null> {
    const fileData = await redisClient.get(`file:${id}`);

    return fileData ? (JSON.parse(fileData) as TmpFileDTO) : null;
  }

  async deleteById(id: string): Promise<string | null> {
    const fileData = await redisClient.get(`file:${id}`);

    if (!fileData) return null;

    const parsedFileData = JSON.parse(fileData) as TmpFileDTO;

    await fsPromises.rm(parsedFileData.path);
    await redisClient.del(`file:${parsedFileData.id}`);

    return parsedFileData.id;
  }

  async clear(): Promise<void> {
    await fsPromises.rm(this._dir, { recursive: true });
    await fsPromises.mkdir(this._dir, { recursive: true });

    const keys = await redisClient.keys('file:*');

    if (keys.length > 0) {
      await redisClient.del(...keys);
    }
  }
}
