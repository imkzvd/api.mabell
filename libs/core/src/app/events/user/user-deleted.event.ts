import { Event } from '../../ports';
import { UserId } from '../../../../domain/components/user';

export type UserDeletedEventPayload = {
  id: UserId;
};

export class UserDeletedEvent extends Event<UserDeletedEventPayload> {
  public readonly name = 'user.deleted';

  constructor(public readonly payload: UserDeletedEventPayload) {
    super();
  }
}
