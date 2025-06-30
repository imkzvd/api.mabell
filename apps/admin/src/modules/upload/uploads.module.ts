import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadService } from '../../../../../core/app/components/upload/upload.service';
import { UploadFileHandler } from '../../../../../core/app/cqrs/upload/commands/upload-file/upload-file.handler';
import { GetFileHandler } from '../../../../../core/app/cqrs/upload/queries/get-file/get-file.handler';
import { DeleteFileHandler } from '../../../../../core/app/cqrs/upload/commands/delete-file/delete-file.handler';
import { DeleteAllFilesHandler } from '../../../../../core/app/cqrs/upload/commands/delete-all-files/delete-all-files.handler';

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
