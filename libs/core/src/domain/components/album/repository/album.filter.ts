import { QueryFilter } from '../../../common/repository/query-filter.abstract';

export class AlbumFilter extends QueryFilter {
  public readonly name?: string;
  public readonly artists?: string[];
  public readonly type?: string;
  public readonly isActive?: boolean;
  public readonly isPublic?: boolean;

  constructor(
    options: Partial<{
      name: string;
      artists: string[];
      type: string;
      isActive: boolean;
      isPublic: boolean;
    }>,
  ) {
    super();

    this.name = options.name;
    this.artists = options.artists;
    this.type = options.type;
    this.isActive = options.isActive;
    this.isPublic = options.isPublic;
  }
}
