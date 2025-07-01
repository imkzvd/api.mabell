import { Event } from '../ports/event-bus.port';
import { UserId } from '@core/domain/components/user/types';

export type UserUnblockedPayload = {
  id: UserId;
};

export class UserUnblockedEvent implements Event<UserUnblockedPayload> {
  public readonly name = 'user.unblocked';

  constructor(public readonly payload: UserUnblockedPayload) {}
}
