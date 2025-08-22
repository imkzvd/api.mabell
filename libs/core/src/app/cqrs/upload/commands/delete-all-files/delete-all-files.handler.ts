import { CommandHandler } from '../../../../types';
import { DeleteAllFilesCommand } from './delete-all-files.command';
import { UploadDeleteService } from '../../../../components/upload';

export class DeleteAllFilesHandler implements CommandHandler<DeleteAllFilesCommand> {
  constructor(private readonly _service: UploadDeleteService) {}

  async execute() {
    return this._service.deleteAll();
  }
}
