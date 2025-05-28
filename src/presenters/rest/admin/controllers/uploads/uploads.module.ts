import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';

import { UploadFileHandler } from '../../../../../core/app/components/upload/commands/upload-file/upload-file.handler';
import { GetFileHandler } from '../../../../../core/app/components/upload/queries/get-file/get-file.handler';
import { DeleteFileHandler } from '../../../../../core/app/components/upload/commands/delete-file/delete-file.handler';
import { DeleteAllFilesHandler } from '../../../../../core/app/components/upload/commands/delete-all-files/delete-all-files.handler';
import { UploadService } from '../../../../../core/app/components/upload/upload.service';

@Module({
  providers: [
    UploadService,
    UploadFileHandler,
    GetFileHandler,
    DeleteFileHandler,
    DeleteAllFilesHandler,
  ],
  controllers: [UploadsController],
})
export class UploadsModule {}
