import { CommandHandler } from '@core/app/types';
import { NotFoundException } from '@core/shared/exceptions';
import { DeleteFileCommand } from '@core/app/cqrs/upload/commands/delete-file/delete-file.command';
import { UploadDeleteService } from '@core/app/components/upload/services/upload-delete.service';

export class DeleteFileHandler implements CommandHandler<DeleteFileCommand> {
  constructor(private readonly _service: UploadDeleteService) {}

  async execute({ id }: DeleteFileCommand) {
    const deleteFileId = await this._service.delete(id);

    if (!deleteFileId) {
      throw new NotFoundException("File doesn't exist");
    }

    return deleteFileId;
  }
}
