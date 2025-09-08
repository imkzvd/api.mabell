import * as fsPromises from 'fs/promises';
import * as path from 'path';
import * as process from 'process';
import * as sharp from 'sharp';

export abstract class FileStorage {
  protected readonly _projectDirPath: string = process.cwd();
  protected readonly _storagesDirPath: string = path.join(this._projectDirPath, '/storages');
  protected readonly _storageDirPath: string;

  constructor(public readonly storageName: string) {
    this._storageDirPath = path.join(this._storagesDirPath, storageName);

    fsPromises.mkdir(this._storageDirPath, { recursive: true });
  }

  protected async createDirectory(...segments: string[]): Promise<{
    absPath: string;
    relPath: string;
  }> {
    const prepPath = path.join(this._storageDirPath, ...segments);
    await fsPromises.mkdir(prepPath, { recursive: true });

    return this.resolveProjectPath(...segments);
  }

  protected resolveProjectPath(...segments: string[]): { absPath: string; relPath: string } {
    const absolutePath: string = path.join(this._storageDirPath, ...segments);

    return {
      absPath: absolutePath,
      relPath: `/${path.relative(this._projectDirPath, absolutePath)}`,
    };
  }

  protected deleteByPath(path: string): Promise<void> {
    return fsPromises.rm(path, { recursive: true, force: true });
  }

  protected convertAndSaveImage(srcPath: string, distPath: string) {
    return sharp(srcPath).webp().toFile(distPath);
  }

  protected async moveFile(srcPath: string, destPath: string) {
    await fsPromises.copyFile(srcPath, destPath);
    await fsPromises.unlink(srcPath);
  }
}
