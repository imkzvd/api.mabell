import { CommandHandler } from '../../../../types';
import { UploadFileCommand } from './upload-file.command';
import { UploadService } from '../../../../components/upload';

export class UploadFileHandler implements CommandHandler<UploadFileCommand> {
  constructor(private readonly _service: UploadService) {}

  async execute({ payload }: UploadFileCommand) {
    const id = await this._service.upload(payload);

    return { id };
  }
}
