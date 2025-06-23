import { Query } from '@nestjs/cqrs';
import { UserDTO } from '../../../../components/user/dtos/user.dto';

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
