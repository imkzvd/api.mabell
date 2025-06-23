import { Event } from '../ports/event-bus.port';
import { UserId } from '@core/domain/components/user/types';

export type UserBlockedPayload = {
  id: UserId;
};

export class UserBlockedEvent implements Event<UserBlockedPayload> {
  public readonly name = 'user.blocked';

  constructor(public readonly payload: UserBlockedPayload) {}
}
