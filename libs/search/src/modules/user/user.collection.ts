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

  async find(q: string, isGlobal?: boolean) {
    const { items } = await this.search({
      q,
      query_by: 'email',
      ...(Boolean(isGlobal) && {
        filter_by: `isGlobal:=${isGlobal}`,
      }),
    });

    return items.map((item) => this._mapper.toDTO(item));
  }
}
