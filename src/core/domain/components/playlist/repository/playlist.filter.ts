import { QueryFilter } from '../../../common/repository/query-filter.abstract';

export class PlaylistFilter extends QueryFilter {
  public readonly isPublic?: boolean;

  constructor(
    options: Partial<{
      isPublic: boolean;
    }>,
  ) {
    super();

    this.isPublic = options.isPublic;
  }
}
