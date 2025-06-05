import { Command } from '@nestjs/cqrs';
import { TmpFileId } from '../../../../common/ports/file-storages/common/types';
import { UploadFilePayload } from '../../../../components/upload/types';

export class UploadFileCommand extends Command<TmpFileId> {
  constructor(public readonly payload: UploadFilePayload) {
    super();
  }
}
