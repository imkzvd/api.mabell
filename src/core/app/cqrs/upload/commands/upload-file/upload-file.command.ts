import { Command } from '@nestjs/cqrs';
import { TmpFileId } from '../../../../common/ports/file-storages/common/types';

export class UploadFileCommand extends Command<TmpFileId> {
  constructor(public readonly file: Express.Multer.File) {
    super();
  }
}
