import { Module } from '@nestjs/common';
import { FileStorageModule } from '@api.mabell/file-storage';
import { UploadController } from './upload.controller';
import { UploadFileHandler } from './commands/upload-file.handler';
import { DeleteFileHandler } from './commands/delete-file.handler';
import { DeleteAllFilesHandler } from './commands/delete-all-files.handler';
import { GetFileHandler } from './queries/get-file.handler';
import { uploadServiceProvider } from './providers/upload-service.provider';
import { uploadDeleteServiceProvider } from './providers/upload-delete-service.provider';
import { uploadFindServiceProvider } from './providers/upload-find-service.provider';

@Module({
  imports: [FileStorageModule],
  providers: [
    uploadServiceProvider,
    uploadDeleteServiceProvider,
    uploadFindServiceProvider,
    UploadFileHandler,
    DeleteFileHandler,
    DeleteAllFilesHandler,
    GetFileHandler,
  ],
  controllers: [UploadController],
})
export class UploadModule {}
