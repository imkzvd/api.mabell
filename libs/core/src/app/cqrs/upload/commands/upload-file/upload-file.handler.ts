import { CommandHandler } from '@core/app/types';
import { UploadService } from '@core/app/components/upload/upload.service';
import { UploadFileCommand } from '@core/app/cqrs/upload/commands/upload-file/upload-file.command';

export class UploadFileHandler implements CommandHandler<UploadFileCommand> {
  constructor(private readonly _uploadService: UploadService) {}

  async execute({ payload }: UploadFileCommand) {
    return await this._uploadService.uploadFile(payload);
  }
}
