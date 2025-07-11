import { Event } from '@core/app/common/ports/event-bus.port';
import { UserId } from '@core/domain/components/user/types';

export type UserUnblockedEventPayload = {
  id: UserId;
};

export class UserUnblockedEvent extends Event<UserUnblockedEventPayload> {
  public readonly name = 'user.unblocked';

  constructor(public readonly payload: UserUnblockedEventPayload) {
    super();
  }
}
