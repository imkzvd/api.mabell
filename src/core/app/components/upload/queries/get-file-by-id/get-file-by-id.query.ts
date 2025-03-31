import { Query } from '@nestjs/cqrs';
import { TmpFileDTO } from '../../dtos/tmp-file.dto';

export class GetFileByIdQuery extends Query<TmpFileDTO | null> {
  constructor(public readonly id: string) {
    super();
  }
}
