import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UploadService } from '@core/app/components/upload/upload.service';
import { DeleteFileHandler as CoreDeleteFileHandler } from '@core/app/cqrs/upload/commands/delete-file/delete-file.handler';
import { DeleteFileCommand } from '@core/app/cqrs/upload/commands/delete-file/delete-file.command';

@CommandHandler(DeleteFileCommand)
export class DeleteFileHandler implements ICommandHandler<DeleteFileCommand> {
  private readonly _coreHandler: CoreDeleteFileHandler;

  constructor(@Inject(UploadService) service: UploadService) {
    this._coreHandler = new CoreDeleteFileHandler(service);
  }

  execute(command: DeleteFileCommand) {
    return this._coreHandler.execute(command);
  }
}
