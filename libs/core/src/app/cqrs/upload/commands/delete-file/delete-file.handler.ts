import { CommandHandler } from '../../../../types';
import { DeleteFileCommand } from './delete-file.command';
import { UploadDeleteService } from '../../../../components/upload';
import { NotFoundException } from '../../../../../shared/exceptions';

export class DeleteFileHandler implements CommandHandler<DeleteFileCommand> {
  constructor(private readonly _service: UploadDeleteService) {}

  async execute({ id }: DeleteFileCommand) {
    const deleteFileId = await this._service.deleteById(id);

    if (!deleteFileId) {
      throw new NotFoundException("File doesn't exist");
    }
  }
}
