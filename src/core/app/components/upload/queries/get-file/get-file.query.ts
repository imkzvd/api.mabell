import { Query } from '@nestjs/cqrs';
import { TmpFileDTO } from '../../../../common/ports/file-storages/common/dtos/tmp-file.dto';

export class GetFileQuery extends Query<TmpFileDTO | null> {
  constructor(public readonly id: string) {
    super();
  }
}
