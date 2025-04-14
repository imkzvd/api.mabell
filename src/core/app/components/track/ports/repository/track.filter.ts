import { QueryFilter } from '../../../../../domain/common/repository/query-filter.abstract';

export class TrackFilter extends QueryFilter {
  public readonly name?: string;
  public readonly isActive?: boolean;
  public readonly isPublic?: boolean;

  constructor(
    options: Partial<{
      name: string;
      isActive: boolean;
      isPublic: boolean;
    }>,
  ) {
    super();

    this.name = options.name;
    this.isActive = options.isActive;
    this.isPublic = options.isPublic;
  }
}
