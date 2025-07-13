import { UserPayload } from '@infrastructure/typesense/modules/user/types';
import { User } from '@infrastructure/typesense/modules/user/user.document';

export class UserFactory {
  static create(payload: UserPayload) {
    return new User(
      payload.id,
      payload.name,
      payload.email || undefined,
      payload.avatar || undefined,
    );
  }
}
