import { QueryFilter } from '../../../../domain/common/repository/query-filter.abstract';

export class AdminFilter extends QueryFilter {
  constructor(
    public readonly options: Partial<{
      isBlocked: boolean;
    }>,
  ) {
    super();
  }
}
