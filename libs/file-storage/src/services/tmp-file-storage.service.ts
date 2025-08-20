import * as path from 'path';
import * as fsPromises from 'fs/promises';
import * as process from 'process';
import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { App } from '@api.mabell/core';
import { CacheService } from '@api.mabell/cache';

@Injectable()
export class TmpFileStorage implements App.Ports.TmpFileStorage {
  private readonly _dir: string = path.join(process.cwd(), '/tmp');

  constructor(@Inject(CacheService) private readonly _cacheService: CacheService) {
    fsPromises.mkdir(this._dir, { recursive: true });
  }

  async upload(file: Express.Multer.File) {
    const generatedId = uuidv4() as App.Ports.TmpFileId;
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

    const fileData = new App.DTOs.TmpFileDTO(
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

  async findById(fileId: string) {
    const fileData = await this._cacheService.get<string>(`file:${fileId}`);

    return fileData ? (JSON.parse(fileData) as App.DTOs.TmpFileDTO) : null;
  }

  async deleteById(fileId: string) {
    const fileData = await this._cacheService.get<string>(`file:${fileId}`);

    if (!fileData) return null;

    const parsedFileData = JSON.parse(fileData) as App.DTOs.TmpFileDTO;

    await fsPromises.rm(parsedFileData.path);
    await this._cacheService.del(`file:${parsedFileData.id}`);

    return parsedFileData.id;
  }

  async clear() {
    await fsPromises.rm(this._dir, { recursive: true });
    await fsPromises.mkdir(this._dir, { recursive: true });

    await this._cacheService.delByPrefix('file');
  }
}
