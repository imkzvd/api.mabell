import { IndexedUserDTO } from '@core/app/common/ports/search-service/dtos/indexed-user.dto';
import { UserPayload } from '@infrastructure/typesense/modules/user/types';
import UserMapper from '@infrastructure/typesense/modules/user/user.mapper';
import { TypeSenseClient } from '@infrastructure/typesense/client';
import { User } from '@infrastructure/typesense/modules/user/user.document';
import { BaseCollection } from '@infrastructure/typesense/base/base-collection.abstract';

export class UserCollection extends BaseCollection<User, IndexedUserDTO, UserPayload> {
  constructor() {
    super(
      TypeSenseClient,
      'users',
      {
        name: 'users',
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
}
