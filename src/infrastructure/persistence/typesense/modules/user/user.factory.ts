import { UserDTO } from '../../../../../core/app/components/user/dtos/user.dto';
import { User } from './user.document';

export class UserFactory {
  static create(dto: UserDTO) {
    return new User(dto.id, dto.name, dto.email || undefined, dto.avatar || undefined);
  }
}
