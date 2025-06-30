import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UploadService } from '@core/app/components/upload/upload.service';
import { DeleteAllFilesCommand } from '@core/app/cqrs/upload/commands/delete-all-files/delete-all-files.command';
import { DeleteAllFilesHandler as CoreDeleteAllFilesHandler } from '@core/app/cqrs/upload/commands/delete-all-files/delete-all-files.handler';

@CommandHandler(DeleteAllFilesCommand)
export class DeleteAllFilesHandler implements ICommandHandler<DeleteAllFilesCommand> {
  private readonly _coreHandler: CoreDeleteAllFilesHandler;

  constructor(@Inject(UploadService) service: UploadService) {
    this._coreHandler = new CoreDeleteAllFilesHandler(service);
  }

  execute() {
    return this._coreHandler.execute();
  }
}
