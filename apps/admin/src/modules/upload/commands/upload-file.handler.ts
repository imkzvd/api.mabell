import { CommandHandler } from '@nestjs/cqrs';
import { UploadFileCommand } from '@core/app/cqrs/upload/commands/upload-file/upload-file.command';
import { UploadFileHandler as CoreUploadFileHandler } from '@core/app/cqrs/upload/commands/upload-file/upload-file.handler';
import { UploadService } from '@core/app/components/upload/services/upload.service';

@CommandHandler(UploadFileCommand)
export class UploadFileHandler extends CoreUploadFileHandler {
  constructor(service: UploadService) {
    super(service);
  }
}
