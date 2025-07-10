import { CommandHandler } from '@nestjs/cqrs';
import { DeleteFileHandler as CoreDeleteFileHandler } from '@core/app/cqrs/upload/commands/delete-file/delete-file.handler';
import { DeleteFileCommand } from '@core/app/cqrs/upload/commands/delete-file/delete-file.command';
import { UploadDeleteService } from '@core/app/components/upload/services/upload-delete.service';

@CommandHandler(DeleteFileCommand)
export class DeleteFileHandler extends CoreDeleteFileHandler {
  constructor(service: UploadDeleteService) {
    super(service);
  }
}
