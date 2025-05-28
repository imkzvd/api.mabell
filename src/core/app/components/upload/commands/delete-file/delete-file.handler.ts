import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteFileCommand } from './delete-file.command';
import { NotFoundException } from '../../../../../shared/exceptions';
import { UploadService } from '../../upload.service';

@CommandHandler(DeleteFileCommand)
export class DeleteFileHandler implements ICommandHandler<DeleteFileCommand> {
  constructor(@Inject(UploadService) private readonly _uploadService: UploadService) {}

  async execute({ id }: DeleteFileCommand) {
    const deleteFileId = await this._uploadService.deleteFile(id);

    if (!deleteFileId) {
      throw new NotFoundException("File doesn't exist");
    }

    return deleteFileId;
  }
}
