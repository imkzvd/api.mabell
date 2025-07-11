import { CommandHandler } from '@nestjs/cqrs';
import { DeleteAllFilesCommand } from '@core/app/cqrs/upload/commands/delete-all-files/delete-all-files.command';
import { DeleteAllFilesHandler as CoreDeleteAllFilesHandler } from '@core/app/cqrs/upload/commands/delete-all-files/delete-all-files.handler';
import { UploadDeleteService } from '@core/app/components/upload/services/upload-delete.service';

@CommandHandler(DeleteAllFilesCommand)
export class DeleteAllFilesHandler extends CoreDeleteAllFilesHandler {
  constructor(service: UploadDeleteService) {
    super(service);
  }
}
