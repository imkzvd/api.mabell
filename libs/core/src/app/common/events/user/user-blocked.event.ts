import { Event } from '@core/app/common/ports/event-bus.port';
import { UserId } from '@core/domain/components/user/types';

export type UserBlockedEventPayload = {
  id: UserId;
};

export class UserBlockedEvent extends Event<UserBlockedEventPayload> {
  public readonly name = 'user.blocked';

  constructor(public readonly payload: UserBlockedEventPayload) {
    super();
  }
}
