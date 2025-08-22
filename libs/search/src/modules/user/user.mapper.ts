import { App } from '@api.mabell/core';
import { UserPayload } from './types';
import { UserFactory } from './user.factory';
import { User } from './user.document';
import { BaseMapper } from '../../base/base-mapper.interface';

class UserMapper implements BaseMapper<User, App.DTOs.IndexedUserDTO, UserPayload> {
  toDocument(payload: UserPayload): User {
    return UserFactory.create(payload);
  }

  toDTO(doc: User): App.DTOs.IndexedUserDTO {
    return new App.DTOs.IndexedUserDTO(doc.id, doc.name, doc.email || null, doc.avatar || null);
  }
}

export default new UserMapper();
