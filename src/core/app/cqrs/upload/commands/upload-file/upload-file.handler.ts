import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UploadFileCommand } from './upload-file.command';
import { UploadService } from '../../../../components/upload/upload.service';

@CommandHandler(UploadFileCommand)
export class UploadFileHandler implements ICommandHandler<UploadFileCommand> {
  constructor(@Inject(UploadService) private readonly _uploadService: UploadService) {}

  async execute({ payload }: UploadFileCommand) {
    return await this._uploadService.uploadFile(payload);
  }
}
