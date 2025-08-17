import { Event } from '../../ports';
import { UserId } from '../../../../domain/components/user';

export type UserUnblockedEventPayload = {
  id: UserId;
};

export class UserUnblockedEvent extends Event<UserUnblockedEventPayload> {
  public readonly name = 'user.unblocked';

  constructor(public readonly payload: UserUnblockedEventPayload) {
    super();
  }
}
