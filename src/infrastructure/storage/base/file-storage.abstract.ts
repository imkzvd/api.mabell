import * as fsPromises from 'fs/promises';
import * as sharp from 'sharp';
import * as path from 'path';
import * as process from 'process';

export abstract class FileStorage {
  protected readonly _rootDirPath: string = process.cwd();
  protected readonly _rootStorageDirPath: string = path.join(this._rootDirPath, '/storage');
  protected readonly _storageDirPath: string;

  constructor(public readonly directoryName: string) {
    const dirPath = path.join(this._rootStorageDirPath, directoryName);

    this._storageDirPath = dirPath;
    fsPromises.mkdir(dirPath, { recursive: true });
  }

  protected createDirectory(id: string) {
    return fsPromises.mkdir(path.join(this._storageDirPath, id), { recursive: true });
  }

  protected getDirectoryById(id: string): string {
    return path.join(this._storageDirPath, id);
  }

  protected deleteDirectoryById(id: string): Promise<void> {
    return fsPromises.rm(path.join(this._storageDirPath, id), { recursive: true, force: true });
  }

  protected deleteFileByIdFromDirectory(id: string, path: string): Promise<void> {
    return fsPromises.rm(path, { recursive: true, force: true });
  }

  protected async existsDirectoryById(id: string): Promise<boolean> {
    try {
      await fsPromises.access(path.join(this._storageDirPath, id));

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return false;
    }
  }

  protected getAbsolutePath(id: string, fileName: string): string {
    return path.join(this._storageDirPath, id, fileName);
  }

  protected getRelativePath(dirPath: string): string {
    return `/${path.relative(this._rootDirPath, dirPath)}`;
  }

  protected convertImageToWebp(input: string, output: string) {
    return sharp(input).webp().toFile(output);
  }
}
