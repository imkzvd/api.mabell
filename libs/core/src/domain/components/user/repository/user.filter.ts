import { QueryFilter } from '../../../common/repository/query-filter.abstract';
import { Region } from '../../../common/constants/regions';

export class UserFilter extends QueryFilter {
  public readonly username?: string;
  public readonly name?: string;
  public readonly email?: string;
  public readonly region?: Region;
  public readonly isBlocked?: boolean;
  public readonly isVerified?: boolean;
  public readonly isPremium?: boolean;
  public readonly isPublic?: boolean;

  constructor(
    options: Partial<{
      username: string;
      name: string;
      email: string;
      region: Region;
      isBlocked: boolean;
      isVerified: boolean;
      isPremium: boolean;
      isPublic: boolean;
    }>,
  ) {
    super();

    this.username = options.username;
    this.name = options.name;
    this.email = options.email;
    this.region = options.region;
    this.isBlocked = options.isBlocked;
    this.isVerified = options.isVerified;
    this.isPremium = options.isPremium;
    this.isPublic = options.isPublic;
  }
}
