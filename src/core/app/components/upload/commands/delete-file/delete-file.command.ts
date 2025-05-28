import { Command } from '@nestjs/cqrs';
import { TmpFileId } from '../../../../common/ports/file-storages/common/types';

export class DeleteFileCommand extends Command<TmpFileId> {
  constructor(public readonly id: string) {
    super();
  }
}
