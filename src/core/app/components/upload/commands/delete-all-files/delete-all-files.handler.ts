import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { TMP_FILE_STORAGE_DI_TOKEN, TmpFileStorage } from '../../storage/tmp-file-storage.port';
import { DeleteAllFilesCommand } from './delete-all-files.command';

@CommandHandler(DeleteAllFilesCommand)
export class DeleteAllFilesHandler implements ICommandHandler<DeleteAllFilesCommand> {
  constructor(
    @Inject(TMP_FILE_STORAGE_DI_TOKEN)
    private readonly _tmpFileStorage: TmpFileStorage,
  ) {}

  async execute() {
    return this._tmpFileStorage.clear();
  }
}
