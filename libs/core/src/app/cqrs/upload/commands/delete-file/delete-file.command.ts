import { Command } from '@core/app/types';
import { TmpFileId } from '@core/app/common/ports/file-storages/common/types';

export class DeleteFileCommand extends Command<TmpFileId> {
  constructor(public readonly id: string) {
    super();
  }
}
