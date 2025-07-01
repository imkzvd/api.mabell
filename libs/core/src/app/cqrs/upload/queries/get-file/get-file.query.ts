import { Query } from '@core/app/types';
import { TmpFileDTO } from '@core/app/common/ports/file-storages/common/dtos/tmp-file.dto';

export class GetFileQuery extends Query<TmpFileDTO | null> {
  constructor(public readonly id: string) {
    super();
  }
}
