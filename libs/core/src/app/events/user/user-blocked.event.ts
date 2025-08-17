import { Event } from '../../ports';
import { UserId } from '../../../../domain/components/user';

export type UserBlockedEventPayload = {
  id: UserId;
};

export class UserBlockedEvent extends Event<UserBlockedEventPayload> {
  public readonly name = 'user.blocked';

  constructor(public readonly payload: UserBlockedEventPayload) {
    super();
  }
}
