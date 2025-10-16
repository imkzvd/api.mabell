import { App } from '@api.mabell/core';
import { UserPayload } from './types';
import UserMapper from './user.mapper';
import { User } from './user.document';
import { BaseCollection } from '../../base/base-collection.abstract';

export class UserCollection extends BaseCollection<User, App.DTOs.IndexedUserDTO, UserPayload> {
  constructor() {
    const collectionName = 'users';

    super(
      collectionName,
      {
        name: collectionName,
        fields: [
          { name: 'id', type: 'string', index: false },
          { name: 'name', type: 'string', index: false },
          { name: 'email', type: 'string', optional: true },
          { name: 'avatar', type: 'string', optional: true, index: false },
        ],
      },
      UserMapper,
    );
  }

  async findByQuery(q: string, options?: Partial<{ isGlobal: boolean }>) {
    return this.search({
      q,
      query_by: 'email',
      ...(Boolean(options?.isGlobal) && {
        filter_by: `isGlobal:=${options?.isGlobal}`,
      }),
    });
  }
}
