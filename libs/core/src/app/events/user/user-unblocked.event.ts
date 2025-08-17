import { Event } from '../../ports/event-bus/types';
import { UserId } from '../../../domain/components/user/types';

export type UserUnblockedEventPayload = {
  id: UserId;
};

export class UserUnblockedEvent extends Event<UserUnblockedEventPayload> {
  public readonly name = 'user.unblocked';

  constructor(public readonly payload: UserUnblockedEventPayload) {
    super();
  }
}
