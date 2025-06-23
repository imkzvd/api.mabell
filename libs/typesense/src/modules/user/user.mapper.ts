import { UserDTO } from '@core/app/components/user/dtos/user.dto';
import { IndexedUserDTO } from '@core/app/components/search/ports/search-service/dtos/indexed-user.dto';
import { User } from './user.document';
import { UserFactory } from './user.factory';

class UserMapper {
  toDocument(dto: UserDTO): User {
    return UserFactory.create(dto);
  }

  toDTO(doc: User): IndexedUserDTO {
    return new IndexedUserDTO(doc.id, doc.name, doc.email || null, doc.avatar || null);
  }
}

export default new UserMapper();
