import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UploadFileCommand } from '@core/app/cqrs/upload/commands/upload-file/upload-file.command';
import { UploadFileHandler as CoreUploadFileHandler } from '@core/app/cqrs/upload/commands/upload-file/upload-file.handler';
import { UploadService } from '@core/app/components/upload/upload.service';

@CommandHandler(UploadFileCommand)
export class UploadFileHandler implements ICommandHandler<UploadFileCommand> {
  private readonly _coreHandler: CoreUploadFileHandler;

  constructor(@Inject(UploadService) service: UploadService) {
    this._coreHandler = new CoreUploadFileHandler(service);
  }

  execute(command: UploadFileCommand) {
    return this._coreHandler.execute(command);
  }
}
