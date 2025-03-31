import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UploadFileCommand } from './upload-file.command';
import { TMP_FILE_STORAGE_DI_TOKEN, TmpFileStorage } from '../../storage/tmp-file-storage.port';

@CommandHandler(UploadFileCommand)
export class UploadFileHandler implements ICommandHandler<UploadFileCommand> {
  constructor(
    @Inject(TMP_FILE_STORAGE_DI_TOKEN)
    private readonly _tmpFileStorage: TmpFileStorage,
  ) {}

  async execute({ file }: UploadFileCommand) {
    const { id } = await this._tmpFileStorage.upload(file);

    return {
      id,
    };
  }
}
