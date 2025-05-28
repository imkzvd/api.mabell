import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteAllFilesCommand } from './delete-all-files.command';
import { UploadService } from '../../upload.service';

@CommandHandler(DeleteAllFilesCommand)
export class DeleteAllFilesHandler implements ICommandHandler<DeleteAllFilesCommand> {
  constructor(@Inject(UploadService) private readonly _uploadService: UploadService) {}

  async execute() {
    return this._uploadService.deleteAllFiles();
  }
}
