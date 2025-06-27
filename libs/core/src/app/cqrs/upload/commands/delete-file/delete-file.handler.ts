import { CommandHandler } from '@core/app/types';
import { NotFoundException } from '@core/shared/exceptions';
import { UploadService } from '@core/app/components/upload/upload.service';
import { DeleteFileCommand } from '@core/app/cqrs/upload/commands/delete-file/delete-file.command';

export class DeleteFileHandler implements CommandHandler<DeleteFileCommand> {
  constructor(private readonly _uploadService: UploadService) {}

  async execute({ id }: DeleteFileCommand) {
    const deleteFileId = await this._uploadService.deleteFile(id);

    if (!deleteFileId) {
      throw new NotFoundException("File doesn't exist");
    }

    return deleteFileId;
  }
}
