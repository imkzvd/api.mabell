import { QueryFilter } from '../../../common/repository/query-filter.abstract';

export class ArtistFilter extends QueryFilter {
  public readonly name?: string;
  public readonly birthName?: string;
  public readonly isActive?: boolean;
  public readonly isPublic?: boolean;

  constructor(
    options: Partial<{
      name: string;
      birthName: string;
      isActive: boolean;
      isPublic: boolean;
    }>,
  ) {
    super();

    this.name = options.name;
    this.birthName = options.birthName;
    this.isActive = options.isActive;
    this.isPublic = options.isPublic;
  }
}
