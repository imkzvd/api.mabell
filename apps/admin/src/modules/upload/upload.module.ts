import { Module } from '@nestjs/common';
import { FileStorageModule } from '@infrastructure/file-storage';
import { UploadController } from './upload.controller';
import { UploadFileHandler } from './commands/upload-file.handler';
import { DeleteFileHandler } from './commands/delete-file.handler';
import { DeleteAllFilesHandler } from './commands/delete-all-files.handler';
import { GetFileHandler } from './queries/get-file.handler';
import { uploadServiceProvider } from './providers/upload-service.provider';

@Module({
  imports: [FileStorageModule],
  providers: [
    uploadServiceProvider,
    UploadFileHandler,
    DeleteFileHandler,
    DeleteAllFilesHandler,
    GetFileHandler,
  ],
  controllers: [UploadController],
})
export class UploadModule {}
