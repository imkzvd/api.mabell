import { IndexedUserDTO } from '@api.mabell/core';
import { UserPayload } from './types';
import { UserFactory } from './user.factory';
import { User } from './user.document';
import { BaseMapper } from '../../base/base-mapper.interface';

class UserMapper implements BaseMapper<User, IndexedUserDTO, UserPayload> {
  toDocument(payload: UserPayload): User {
    return UserFactory.create(payload);
  }

  toDTO(doc: User): IndexedUserDTO {
    return new IndexedUserDTO(doc.id, doc.name, doc.email || null, doc.avatar || null);
  }
}

export default new UserMapper();
