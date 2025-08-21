import { Command } from '../../../../types';
import { UploadFilePayload } from '../../../../components/upload/types';
import { TmpFileId } from '../../../../ports/file-storages/types';

export class UploadFileCommand extends Command<{ id: TmpFileId }> {
  constructor(public readonly payload: UploadFilePayload) {
    super();
  }
}
