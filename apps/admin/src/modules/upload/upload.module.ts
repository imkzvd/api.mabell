import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from '@core/app/components/upload/upload.service';
import { UploadFileHandler } from './commands/upload-file.handler';
import { DeleteFileHandler } from './commands/delete-file.handler';
import { DeleteAllFilesHandler } from './commands/delete-all-files.handler';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { FileStorageModule, TmpFileStorage } from '@infrastructure/file-storage';
import { GetFileHandler } from './queries/get-file.handler';

@Module({
  imports: [FileStorageModule],
  providers: [
    {
      provide: UploadService,
      useFactory: (fs: TmpFileStoragePort) => new UploadService(fs),
      inject: [TmpFileStorage],
    },
    UploadFileHandler,
    DeleteFileHandler,
    DeleteAllFilesHandler,
    GetFileHandler,
  ],
  controllers: [UploadController],
})
export class UploadModule {}
