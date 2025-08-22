import { Event } from '../../ports/event-bus/types';
import { UserId } from '../../../domain/components/user/types';

export type UserDeletedEventPayload = {
  id: UserId;
};

export class UserDeletedEvent extends Event<UserDeletedEventPayload> {
  public readonly name = 'user.deleted';

  constructor(public readonly payload: UserDeletedEventPayload) {
    super();
  }
}
