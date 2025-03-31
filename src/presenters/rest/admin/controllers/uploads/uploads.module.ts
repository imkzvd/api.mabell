import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';

import { UploadFileHandler } from '../../../../../core/app/components/upload/commands/upload-file/upload-file.handler';
import { GetFileByIdHandler } from '../../../../../core/app/components/upload/queries/get-file-by-id/get-file-by-id.handler';
import { TmpFileStorageModule } from '../../../../../infrastructure/storage/tmp-fs-storage/tmp-file-storage.module';
import { DeleteFileByIdHandler } from '../../../../../core/app/components/upload/commands/delete-file-by-id/delete-file-by-id.handler';
import { DeleteAllFilesHandler } from '../../../../../core/app/components/upload/commands/delete-all-files/delete-all-files.handler';

@Module({
  imports: [TmpFileStorageModule],
  providers: [UploadFileHandler, GetFileByIdHandler, DeleteFileByIdHandler, DeleteAllFilesHandler],
  controllers: [UploadsController],
})
export class UploadsModule {}
