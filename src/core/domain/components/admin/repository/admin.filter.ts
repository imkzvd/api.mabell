import { QueryFilter } from '../../../common/repository/query-filter.abstract';

export class AdminFilter extends QueryFilter {
  public readonly username?: string;
  public readonly isBlocked?: boolean;

  constructor(
    options: Partial<{
      username: string;
      isBlocked: boolean;
    }>,
  ) {
    super();

    this.username = options.username;
    this.isBlocked = options.isBlocked;
  }
}
