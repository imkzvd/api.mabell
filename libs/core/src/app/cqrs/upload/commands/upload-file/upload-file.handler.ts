import { CommandHandler } from '@core/app/types';
import { UploadFileCommand } from '@core/app/cqrs/upload/commands/upload-file/upload-file.command';
import { UploadService } from '@core/app/components/upload/services/upload.service';

export class UploadFileHandler implements CommandHandler<UploadFileCommand> {
  constructor(private readonly _service: UploadService) {}

  async execute({ payload }: UploadFileCommand) {
    return await this._service.upload(payload);
  }
}
