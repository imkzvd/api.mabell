import { Query } from '../../../../types';
import { TmpFileDTO } from '../../../../dtos';

export class GetFileQuery extends Query<TmpFileDTO | null> {
  constructor(public readonly id: string) {
    super();
  }
}
