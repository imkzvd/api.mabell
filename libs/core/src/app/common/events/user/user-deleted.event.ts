import { Event } from '@core/app/common/ports/event-bus.port';
import { UserId } from '@core/domain/components/user/types';

export type UserDeletedEventPayload = {
  id: UserId;
};

export class UserDeletedEvent extends Event<UserDeletedEventPayload> {
  public readonly name = 'user.deleted';

  constructor(public readonly payload: UserDeletedEventPayload) {
    super();
  }
}
