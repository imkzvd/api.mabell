import { CommandHandler } from '@core/app/types';
import { UploadService } from '@core/app/components/upload/upload.service';
import { DeleteAllFilesCommand } from '@core/app/cqrs/upload/commands/delete-all-files/delete-all-files.command';

export class DeleteAllFilesHandler implements CommandHandler<DeleteAllFilesCommand> {
  constructor(private readonly _uploadService: UploadService) {}

  async execute() {
    return this._uploadService.deleteAllFiles();
  }
}
