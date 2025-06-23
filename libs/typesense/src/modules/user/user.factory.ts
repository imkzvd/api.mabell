import { User } from './user.document';
import { UserDTO } from '../../../../../src/core/app/components/user/dtos/user.dto';

export class UserFactory {
  static create(dto: UserDTO) {
    return new User(dto.id, dto.name, dto.email || undefined, dto.avatar || undefined);
  }
}
