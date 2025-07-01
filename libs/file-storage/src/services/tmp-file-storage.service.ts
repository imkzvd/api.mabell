import { Inject, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fsPromises from 'fs/promises';
import * as process from 'process';
import { v4 as uuidv4 } from 'uuid';
import { CacheService } from '@core/app/common/ports/cache.service.port';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { TmpFileDTO } from '@core/app/common/ports/file-storages/common/dtos/tmp-file.dto';
import { TmpFileId } from '@core/app/common/ports/file-storages/common/types';
import { RedisService } from '@infrastructure/redis';

@Injectable()
export class TmpFileStorage implements TmpFileStoragePort {
  private readonly _dir: string = path.join(process.cwd(), '/tmp');

  constructor(@Inject(RedisService) private readonly _cacheService: CacheService) {
    fsPromises.mkdir(this._dir, { recursive: true });
  }

  async upload(file: Express.Multer.File): Promise<TmpFileDTO> {
    const generatedId = uuidv4() as TmpFileId;
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

    await this._cacheService.set(
      prepKey,
      JSON.stringify(fileData),
      Math.round((expiresAt.getTime() - Date.now()) / 1000),
    );

    return fileData;
  }

  async findById(id: string): Promise<TmpFileDTO | null> {
    const fileData = await this._cacheService.get(`file:${id}`);

    return fileData ? (JSON.parse(fileData) as TmpFileDTO) : null;
  }

  async deleteById(id: string): Promise<TmpFileId | null> {
    const fileData = await this._cacheService.get(`file:${id}`);

    if (!fileData) return null;

    const parsedFileData = JSON.parse(fileData) as TmpFileDTO;

    await fsPromises.rm(parsedFileData.path);
    await this._cacheService.del(`file:${parsedFileData.id}`);

    return parsedFileData.id;
  }

  async clear(): Promise<void> {
    await fsPromises.rm(this._dir, { recursive: true });
    await fsPromises.mkdir(this._dir, { recursive: true });

    await this._cacheService.delByPrefix('file');
  }
}
