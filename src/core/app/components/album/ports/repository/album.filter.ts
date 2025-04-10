import { QueryFilter } from '../../../../../domain/common/repository/query-filter.abstract';

export class AlbumFilter extends QueryFilter {
  public readonly name?: string;
  public readonly artist?: string;
  public readonly type?: string;
  public readonly isActive?: boolean;
  public readonly isPublic?: boolean;

  constructor(
    options: Partial<{
      name: string;
      artist: string;
      type: string;
      isActive: boolean;
      isPublic: boolean;
    }>,
  ) {
    super();

    this.name = options.name;
    this.artist = options.artist;
    this.type = options.type;
    this.isActive = options.isActive;
    this.isPublic = options.isPublic;
  }
}
