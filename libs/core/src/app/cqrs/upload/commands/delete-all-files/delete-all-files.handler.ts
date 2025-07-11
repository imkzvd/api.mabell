import { CommandHandler } from '@core/app/types';
import { DeleteAllFilesCommand } from '@core/app/cqrs/upload/commands/delete-all-files/delete-all-files.command';
import { UploadDeleteService } from '@core/app/components/upload/services/upload-delete.service';

export class DeleteAllFilesHandler implements CommandHandler<DeleteAllFilesCommand> {
  constructor(private readonly _service: UploadDeleteService) {}

  async execute() {
    return this._service.deleteAll();
  }
}
