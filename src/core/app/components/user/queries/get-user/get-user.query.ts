import { Query } from '@nestjs/cqrs';
import { UserDTO } from '../dtos/user.dto';

export class GetUserQuery extends Query<UserDTO | null> {
  constructor(
    public readonly id: string,
    public readonly isPublic?: boolean,
  ) {
    super();
  }
}
