import { Command } from '@core/app/types';
import { TmpFileId } from '@core/app/common/ports/file-storages/common/types';
import { UploadFilePayload } from '@core/app/components/upload/types';

export class UploadFileCommand extends Command<TmpFileId> {
  constructor(public readonly payload: UploadFilePayload) {
    super();
  }
}
