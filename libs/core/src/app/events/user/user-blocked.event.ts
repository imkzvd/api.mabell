import { Event } from '../../ports/event-bus/types';
import { UserId } from '../../../domain/components/user/types';

export type UserBlockedEventPayload = {
  id: UserId;
};

export class UserBlockedEvent extends Event<UserBlockedEventPayload> {
  public readonly name = 'user.blocked';

  constructor(public readonly payload: UserBlockedEventPayload) {
    super();
  }
}
