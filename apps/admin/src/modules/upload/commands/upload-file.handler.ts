import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UploadFileCommand } from '@core/app/cqrs/upload/commands/upload-file/upload-file.command';
import { UploadFileHandler as CoreUploadFileHandler } from '@core/app/cqrs/upload/commands/upload-file/upload-file.handler';
import { UploadService } from '@core/app/components/upload/upload.service';

@CommandHandler(UploadFileCommand)
export class UploadFileHandler extends CoreUploadFileHandler {
  constructor(@Inject(UploadService) service: UploadService) {
    super(service);
  }
}
