import { IndexedUserDTO } from '@core/app/common/ports/search-service/dtos/indexed-user.dto';
import { UserPayload } from '@infrastructure/typesense/modules/user/types';
import { UserFactory } from '@infrastructure/typesense/modules/user/user.factory';
import { User } from '@infrastructure/typesense/modules/user/user.document';
import { BaseMapper } from '@infrastructure/typesense/base/base-mapper.interface';

class UserMapper implements BaseMapper<User, IndexedUserDTO, UserPayload> {
  toDocument(payload: UserPayload): User {
    return UserFactory.create(payload);
  }

  toDTO(doc: User): IndexedUserDTO {
    return new IndexedUserDTO(doc.id, doc.name, doc.email || null, doc.avatar || null);
  }
}

export default new UserMapper();
