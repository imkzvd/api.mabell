import { UserPayload } from './types';
import { User } from './user.document';

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
