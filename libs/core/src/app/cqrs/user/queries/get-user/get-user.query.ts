import { Query } from '@core/app/types';
import { UserDTO } from '@core/app/components/user/dtos/user.dto';

export class GetUserQuery extends Query<UserDTO | null> {
  constructor(
    public readonly id: string,
    public readonly options?: Partial<{
      isPublic: boolean;
    }>,
  ) {
    super();
  }
}
