import { Query } from '../../../../types';
import { UserDTO } from '../../../../dtos';

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
