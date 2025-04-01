import { Query } from '@nestjs/cqrs';
import { UserDTO } from '../../dtos/user.dto';

export class GetUserByIdQuery extends Query<UserDTO | null> {
  constructor(public readonly id: string) {
    super();
  }
}
