import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { TMP_FILE_STORAGE_DI_TOKEN, TmpFileStorage } from '../../storage/tmp-file-storage.port';
import { DeleteFileByIdCommand } from './delete-file-by-id.command';
import { NotFoundException } from '../../../../../shared/exceptions';

@CommandHandler(DeleteFileByIdCommand)
export class DeleteFileByIdHandler implements ICommandHandler<DeleteFileByIdCommand> {
  constructor(
    @Inject(TMP_FILE_STORAGE_DI_TOKEN)
    private readonly _tmpFileStorage: TmpFileStorage,
  ) {}

  async execute({ id }: DeleteFileByIdCommand) {
    const deleteFileId = await this._tmpFileStorage.deleteById(id);

    if (!deleteFileId) {
      throw new NotFoundException("File doesn't exist");
    }
  }
}
